import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmpassword) {
      return toast.error("All fields are required!", { position: 'top-right' });
    }
    if (password !== confirmpassword) {
      return toast.error("Password and Confirm Password do not match. Please try again.", { position: 'top-right' });
    }

    try {
      const url = "http://localhost:5000/auth/signup";

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(url,
        {
          name,
          email,
          password
        },
        config
      );
      if (data.success) {
        toast.success("Sign Up Successful!", { position: 'top-right' });
        setTimeout(() => {
          toast.info("Please login to your account.", { position: 'top-right' });
          container.classList.remove("right-panel-active");
        }, 1000);
      } else {
        toast.error(data.message, { position: 'top-right' });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
     
        toast.error(error.response.data.message, { position: 'top-right' });
      } else {
      
        toast.error("An error occurred. Please try again later.", { position: 'top-right' });
      }
      console.error("Error during signup:", error);
    }
  }

  return (
    <>
      <div className="form-container sign-up-container">
        <form onSubmit={SubmitHandler}>
          <h1>Sign Up</h1>
          <input id="name" type="text" placeholder="Username" onChange={(e) => { setName(e.target.value) }} />
          <input id="email" type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <input id='password' type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <input id='confirmpassword' type="password" placeholder="Confirm Password" onChange={(e) => { setConfirmpassword(e.target.value) }} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default SignUp;
