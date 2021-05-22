import { Link } from "react-router-dom"
import React from "react"
import { useForm } from "react-hook-form"
import "../Signup/Signup.css"

const Login = () => {
  return (
    <form className="signupForm" action="/api/login" method="POST">
      <div className="container">
        <h1>Log In!</h1>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input className="signupButton" type="submit" value="Log In" />
          <hr />
          <div>
            <label htmlFor="dontHaveAnAccount" id="dontHaveAnAccount">
              Don't have an account yet?
              <span className="signupSpan">
                <Link to="/signup"> Sign up.</Link>
              </span>
            </label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
