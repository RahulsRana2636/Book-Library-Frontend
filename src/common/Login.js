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
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    const userType = localStorage.getItem("usertype");
    if (userType === 'Admin' && auth) {
      navigate('/admindashboard');
    }
    else if(userType === 'Student' && auth){
      navigate('/studentdashboard');
    }
}, []);
  const handleLogin = async () => {
    if (!email || !password) {
      errNotify();
      setError(true);
      return false;
    }
  try{
    
    const url= process.env.REACT_APP_API_URL + 'user/login';
    const response = await axios.post(url, { email, password });
    const data = response.data;
    console.warn(data);
    if (data.authtoken) {
    localStorage.setItem("token", data.authtoken);
    localStorage.setItem("usertype", data.user.usertype);
    localStorage.setItem("id", data.user._id);
    handleLoginStatus();
    if (data.user.usertype === 'Admin') {
      successNotify();
      navigate('/admindashboard');
    }
    else {
      successNotify();
    navigate('/studentdashboard');
  }
    
    } else {
      errNotify();
    }
  }
  catch(err){
    errNotify();
    console.error(err);
  }
  };
  

  return (
    <div className="signup-form">
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && (
          <span className="invalid-input">Enter valid email</span>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && (
          <span className="invalid-input">Enter valid password</span>
        )}
      </div>
      <button className="formButton"type="submit" onClick={handleLogin}>
        Login
      </button>
      <ToastContainer />
    </div>
  );
};

export default Login;
