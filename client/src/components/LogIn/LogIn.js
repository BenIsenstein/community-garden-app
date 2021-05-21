import { Link } from "react-router-dom"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import "../Signup/Signup.css"

const Login = () => {
  return (
    <form className="signupForm" action="/login" method="post">
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
          {/* *** NOT WORKING *** */}
          <input
            className="signupButton"
            type="submit"
            value="Log In"
            onClick={function () {
              window.location = "/loggedon"
            }}
          />
          <hr />
          <div>
            <label htmlFor="dontHaveAnAccount" id="dontHaveAnAccount">
              Don't have an account yet?{" "}
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

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({})
  const password = useRef({})
  password.current = watch("password", "")

  async function submit() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    console.log("username:", username)
    console.log("password:", password)
  }
}
