import { Link } from "react-router-dom"
import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import AuthenticationContext from "../../AuthenticationContext"
import "./Signup.css"
import "./Login.css"

const Login = () => {
  const authContext = useContext(AuthenticationContext)
  const { register, formState: { errors }, handleSubmit } = useForm({})

  return (
    <div className="pageBackground">
      <form className="signup-form-container" onSubmit={handleSubmit(async (data) => await authContext.logIn(data))}>
        <div className="signup-form">
          <div className="signup-form-content">
            <h1 className="signup-form-header">Log In!</h1>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                name="username" 
                id="username"
                {...register("username", {required: "You must input a username."})}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                {...register("password", {required: "You must input a password."})}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
              <input className="signupButton" type="submit" value="Log In" />
              <hr />
              <div>
                <label htmlFor="dontHaveAnAccount" id="dontHaveAnAccount">
                  Don't have an account yet?
                  <span className="signupSpan">
                    <Link to="/signup"> Sign up</Link>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
