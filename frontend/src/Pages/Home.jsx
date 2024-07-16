import React from 'react'
import Login from '../Pages/Auth/Login';
import SignUp from '../Pages/Auth/SignUp';
import { ToastContainer } from 'react-toastify'
import '../App.css'

const Homepage = () => {

  const SignUpButton = ('click', () => {
    container.classList.add("right-panel-active")
  });

  const SignInButton = ('click', () => {
    container.classList.remove("right-panel-active")
  });

  return (
    <>
      <div className="container" id="container">
        <SignUp />
        <Login />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us </p>
              <p>OR</p>
              <button className="ghost" id="SignIn" onClick={SignInButton}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>To stay connected with us please login with your personal info</p>
              <p>OR</p>
              <button className="ghost" id="SignUp" onClick={SignUpButton}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Homepage;