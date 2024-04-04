import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const SignUp = ( { handleLoginStatus }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const [error,setError] = React.useState(false);
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
    console.log("useeffect", auth, userType)
  }, []);
 
  const collectData = async () => {
    if (!name || !email || !password || !usertype) {
      setError(true);
      return false;
    }
    try {
      const url= process.env.REACT_APP_API_URL + 'user/createuser';
      // let result = await fetch(url, {
      //   method: 'post',
      //   body: JSON.stringify({ name, email, password, usertype }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      const response = await axios.post(url, {
        name,
        email,
        password,
        usertype
      });
      const data = response.data;
      if (data.authtoken) {
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("usertype", data.user.usertype);
        localStorage.setItem("id", data.user._id);
        handleLoginStatus();
        if (data.user.usertype === 'Admin') {
          navigate('/admindashboard');
        } else {
          navigate('/studentdashboard');
        }
      } else {
        console.error("Not Authorized");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="signup-form">
      <h2>Register</h2>
      <div class='form'>
        <input
          required
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
         {error && !name && <span className='invalid-input'>Enter name</span>}
        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         {error && !email && <span className='invalid-input'>Enter email</span>}
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {error && !password && <span className='invalid-input'>Enter password</span>}
         <input
          required
          type="text"
          placeholder="Usertype"
          value={usertype}
          onChange={(e) => setUserType(e.target.value)}
        />
         {error && !usertype && <span className='invalid-input'>Enter Usertype</span>}
      </div>
      <button className="formButton" type="submit" onClick={collectData}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;


