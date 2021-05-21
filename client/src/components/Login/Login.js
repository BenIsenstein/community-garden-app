import { Link } from "react-router-dom"
import React from "react"
import { useForm } from "react-hook-form"
import "../Signup/Signup.css"

const Login = () => {
  const {
    // register,
    // formState: { errors },
    handleSubmit
    // watch
  } = useForm({})
  // const password = useRef({})
  // const confirmPassword = useRef({})
  // password.current = watch("password", "")
  // confirmPassword.current = watch("confirmPassword", "")

  async function onSubmit(data) {
    let fetchUrl = "/api/login"
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }
    let response = await fetch(fetchUrl, fetchOptions)
    console.log("response: ", response)
    // let resObject = await response.json()
    console.log("login submit worked!!")
  }

  return (
    <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
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

// const Signup = () => {
//   const {
//     // register,
//     // formState: { errors },
//     // handleSubmit,
//     watch
//   } = useForm({})
//   const password = useRef({})
//   password.current = watch("password", "")

//   async function submit() {
//     let username = document.getElementById("username").value
//     let password = document.getElementById("password").value

//     console.log("username:", username)
//     console.log("password:", password)

//     let submissionData = {
//       username: username,
//       password: password
//     }

//     let fetchUrl = "/signup"
//     let fetchOptions = {
//       method: "post",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(submissionData)
//     }

//     let response = await fetch(fetchUrl, fetchOptions)
//     let resObject = await response.json()
//     console.log(resObject)
//   }
// }

export default Login
