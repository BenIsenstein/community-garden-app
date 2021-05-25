import { Link } from "react-router-dom"
import React, { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import GardenSearchAutocomplete from "../IndividualGardens/GardenSearchAutocomplete"
import "./Signup.css"

const Signup = () => {
  const [gardenMembership, setGardenMembership] = useState("")
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({})
  const username = useRef({})
  const password = useRef({})
  const confirmPassword = useRef({})
  username.current = watch("username", "")
  password.current = watch("password", "")
  confirmPassword.current = watch("confirmPassword", "")


  async function onSubmit(data) {

    let fetchUrl = "/api/signup"
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }
    let response = await fetch(fetchUrl, fetchOptions)
    let resObject = await response.json()
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

  const alertData = (data) => alert(JSON.stringify(data))

  useEffect(() => setValue('gardenMembership', gardenMembership), [gardenMembership])

  return (
    <form className="signupForm" onSubmit={handleSubmit(alertData)}>
    {/* <form className="signupForm" onSubmit={handleSubmit(alertData)}> */}
      <div className="container">
        <h1>Sign Up!</h1>
        <div className="form-control">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            {...register("username", {
              required: true
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
            <b>What types of plants are in your garden?</b>
          </label>
          <div className="currentPlantsSelection" id="currentPlantsSelection">
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="fruits"
                value="fruits"
              />
              <label htmlFor="fruits">fruits</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="vegetables"
                value="vegetables"
              />
              <label htmlFor="vegetables">vegetables</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="herbs"
                value="herbs"
              />
              <label htmlFor="herbs">herbs</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="flowers"
                value="flowers"
              />
              <label htmlFor="flowers">flowers</label>
            </div>
            <div>
              <input
                {...register("plantCheckbox", { required: false })}
                type="checkbox"
                name="plantCheckbox"
                id="other"
                value="other"
              />
              <label htmlFor="other">other</label>
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
        <div className="form-control gardenMembership">
          <label htmlFor="gardenMembership">
            <b>If you're currently a member of a garden, search for it here.</b>
          </label>
           <GardenSearchAutocomplete 
            setGardenMembership={setGardenMembership}
           /> 
          <input 
            type='hidden'
            name='gardenMembership'
            {...register('gardenMembership')}
          />
        </div>
        <div>
          <input className="signupButton" type="submit" value="Submit" />
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
