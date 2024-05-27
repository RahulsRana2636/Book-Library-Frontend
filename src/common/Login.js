import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const notifydata = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const successNotify = () => toast.success("Login Successfully!", notifydata);
const errNotify = () => toast.error("Login Failed!", notifydata);

const Login = ({ handleLoginStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    const userType = localStorage.getItem("usertype");
    if (userType === 'Admin' && auth) {
      navigate('/admindashboard');
    } else if (userType === 'Student' && auth) {
      navigate('/studentdashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      errNotify();
      setError(true);
      return false;
    }
    try {
      const url = process.env.REACT_APP_API_URL + 'user/login';
      const response = await axios.post(url, { email, password });
      const data = response.data;
      if (data.authtoken) {
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("usertype", data.user.usertype);
        localStorage.setItem("id", data.user._id);
        handleLoginStatus();
        successNotify();
        if (data.user.usertype === 'Admin') {
          navigate('/admindashboard');
        } else {
          navigate('/studentdashboard');
        }
      } else {
        errNotify();
      }
    } catch (err) {
      errNotify();
      console.error(err);
    }
  };

  return (
    <div className="signup-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            autocomplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="invalid-input">Enter valid email</span>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            autocomplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="invalid-input">Enter valid password</span>
          )}
        </div>
        <button className="formButton" type="submit">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
