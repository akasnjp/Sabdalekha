// import React from 'react'
// import axios from 'axios'
// import './LoginSignup.css'

// import user_icon from '../assets/person.png'
// import email_icon from '../assets/email.png'
// import password_icon from '../assets/password.png'

// const LoginSignup = () =>{

//     const [action,setAction] =useState("Sign Up");
//     return (
//         <div classname = 'container'>
//             <div className="header">
//                <div className="text">{action}</div> 
//                <div className="underline"></div>
//             </div>
//             <div className="inputs">
//                 {action=="Login"?<div></div>:<div className="input">
//                     <img src={user_icon} alt="" />
//                     <input type="text" placeholder='Name' />
//                 </div>}
//                 <div className="input">
//                     <img src={email_icon} alt="" />
//                     <input type="email" placeholder='Email'/>
//                 </div>
//                 <div className="input">
//                     <img src={password_icon} alt="" />
//                     <input type="password" placeholder='Password' />
//                 </div>
//             </div>
//             {action == "Sign Up"?<div></div>:<div className="lost-password">Forgot Password ? <span>Click here</span></div>}
//             <div className="submit-container">
//                 <div className={action=="Login"?"submit gray":"submit"} onClick={()=> setAction("Sign Up")}>Sign Up</div>
//                 <div className={action=="Sign Up"?"submit gray":"submit"} onClick={()=> setAction("Login")}>Login</div>
//             </div>
//         </div>
//     )
// }

// export default LoginSignup

import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (action === 'Sign Up') {
        // Sign Up API call
        await axios.post('http://localhost:3000/signup', formData);
        alert('Sign Up Successful');
      } else {
        // Login API call
        await axios.post('http://localhost:3000/login', formData);
        alert('Login Successful');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div> 
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
        </div>
      </div>
      {action === "Login" && (
        <div className="lost-password">
          Forgot Password ? <span>Click here</span>
        </div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
      <button onClick={handleSubmit} className="submit">
        {action}
      </button>
    </div>
  );
};

export default LoginSignup;
