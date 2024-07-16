import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required!", { position: 'top-right' });
    }
    try {
      const url = "http://localhost:5000/auth/login";

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(url,
        {
          email,
          password
        },
        config
      );
      if (data.success) {
        toast.success("Login Successful!", { position: 'top-right' });
        localStorage.setItem('token', data.jwtToken);
        localStorage.setItem('loggedInUser', data.name);
        setTimeout(() => {
          navigate('/product');
        }, 1000);
      } else {
        toast.error(data.message, { position: 'top-right' });
      }
    } catch (err) {
      if (err.response.data.error)
        return toast.error(err.response.data.error.details[0].message, { position: 'top-right' });
      if (err.response.data.message)
        return toast.error(err.response.data.message, { position: 'top-right' });
    }
  }


  return (
    <>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign In</h1>
          <input id="email" type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <input id='password' type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <button onClick={SubmitHandler}>Sign In</button>
        </form>
      </div>
    </>
  )
}

export default Login;