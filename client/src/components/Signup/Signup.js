import { Link } from "react-router-dom"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import "./Signup.css"

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({})
  const username = useRef({})
  const password = useRef({})
  const confirmPassword = useRef({})
  username.current = watch("username", "")
  password.current = watch("password", "")
  confirmPassword.current = watch("confirmPassword", "")
  let usernameAvailable

  async function onSubmit(data) {
    // let fetchUrl = "http://localhost:3000/api/signup"
    let fetchUrl = "/api/signup"
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }
    let response = await fetch(fetchUrl, fetchOptions)
    // console.log("response: ", response)
    // let resObject = await response.json()
    // console.log("submit worked!!")
  }

  function validatePass(password) {
    return (
      /.{6,}$/.test(password) &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[0-9]+/.test(password)
    )
  }

  return (
    <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <h1>Sign Up!</h1>
        <div className="form-control">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            {...register("username", {
              required: true
              // validate: (value) => usernameAvailable(value) || "Sorry, that name is already taken."
              // validate: () => usernameAvailable || "Sorry, that name is already taken."
            })}
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            {...register("password", {
              required: true,
              validate: (value) =>
                validatePass(value) ||
                "The password must contain an uppercase letter, a lowercase letter, a number, and be at least 6 characters long."
            })}
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">
            <b>Password</b>
          </label>
          <div style={{ display: "flex", color: "red" }}>
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password.current || "The passwords do not match"
                // validatePass(value) ||
                // "The password must contain an uppercase letter, a lowercase letter, a number, and be at least 6 characters long.",
              })}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="howLongGardening">
            <b>How long have you been gardening?</b>
          </label>
          <select
            defaultValue="selectOne"
            {...register("howLongGardening", { required: false })}
            name="howLongGardening"
            id="howLongGardening"
          >
            <option value="selectOne" disabled>
              Please Select
            </option>
            <option value="lessThanOneYear">Less than 1 year</option>
            <option value="oneToFiveYears">1 to 5 years</option>
            <option value="moreThanFiveYears">More than 5 years</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="currentPlants">
            <b>What plants are currently in your garden?</b>
          </label>
          <div className="currentPlantsSelection" id="currentPlantsSelection">
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="peas"
                value="peas"
              />
              <label htmlFor="peas">peas</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="carrots"
                value="carrots"
              />
              <label htmlFor="carrots">carrots</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="zucchini"
                value="zucchini"
              />
              <label htmlFor="zucchini">zucchini</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="tomatoes"
                value="tomatoes"
              />
              <label htmlFor="tomatoes">tomatoes</label>
            </div>
          </div>
        </div>
        <div className="form-control postalCode">
          <label htmlFor="postalCode">
            <b>Postal Code (city?? other location details instead?)</b>
          </label>
          <input
            {...register("postalCode", { required: false })}
            type="text"
            placeholder="Enter Postal Code"
            name="postalCode"
            id="postalCode"
          />
        </div>
        <div className="form-control memberOfGarden">
          <label htmlFor="memberOfGarden">
            <b>If you're currently a member of a garden, select it from our list below:</b>
          </label>
          <select name="memberOfGarden" id="memberOfGarden">
            <option value="gardenA">Garden A</option>
            <option value="gardenB">Garden B</option>
            <option value="gardenC">Garden C</option>
          </select>
        </div>
        <div>
          <input
            className="signupButton"
            type="submit"
            value="Submit"
            // *** FIX THIS... redirects without validating :(
            // onClick={function () {
            //   window.location = "/loggedon"
            // }}
            // onclick="window.location='www.google.com'"
          />
          {/* <Link to="/login" className="signupButton" type="submit">
            Sign Up Now
          </Link> */}
          <hr />
          <div>
            <label htmlFor="alreadyHaveAnAccount" id="alreadyHaveAnAccount">
              Already have an account?
              <span className="signupSpan">
                <Link to="/login"> Log in.</Link>
              </span>
            </label>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Signup
