import React, { useState} from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
const SignUp = ( ) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [usertype, setUserType] = useState("");
  const [error,setError] = React.useState(false);
  const notifydata = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  const successNotify = () => toast.success("Now you can login", notifydata);
  const errNotify = () => toast.error("SignUp Failed!", notifydata);
 
 
  const collectData = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    try {
      const url= process.env.REACT_APP_API_URL + 'user/createuser';
    
      const response = await axios.post(url, {
        name,
        email,
        password,
        usertype: 'Student'
      });
      const data = response.data;
      if (data.authtoken) {
        successNotify();
      } else {
        console.error("Not Authorized");
        errNotify();
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
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         {error && !email && <span className='invalid-input'>Enter email</span>}
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {error && !password && <span className='invalid-input'>Enter password</span>}
         {/* <input
          required
          type="text"
          placeholder="Usertype"
          value={usertype}
          onChange={(e) => setUserType(e.target.value)}
        />
         {error && !usertype && <span className='invalid-input'>Enter Usertype</span>} */}
      </div>
      <button className="formButton" type="submit" onClick={collectData}>
        SignUp
      </button>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;


