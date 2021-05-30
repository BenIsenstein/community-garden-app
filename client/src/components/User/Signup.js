import { Link } from "react-router-dom"
import React, { useRef, useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import GardenSearchAutocomplete from "./GardenSearchAutocomplete/GardenSearchAutocomplete"
import "./Signup.css"
import AuthenticationContext from "../../AuthenticationContext"

const Signup = () => {
  const authContext = useContext(AuthenticationContext)
  const [gardenMembership, setGardenMembership] = useState("")
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm({})
  const username = useRef({})
  const password = useRef({})
  const confirmPassword = useRef({})
  username.current = watch("username", "")
  password.current = watch("password", "")
  confirmPassword.current = watch("confirmPassword", "")

  async function onSubmit(data) {
    let fetchUrl = "/api/user/signup"
    let fetchOptions = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }

    try { 
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      // promt them to logout if they're logged in
      if (resObject.isAlreadyLoggedIn) {
        let willTheyLogOut = window.confirm("You must be logged out to sign up. Logout?")
        if (willTheyLogOut) {await authContext.logOut()}
      }
      else {
        let { username, password } = data
        alert(resObject.message)
        await authContext.logIn({username, password})
      }
    }
    catch(err) {
      console.log('Error signing up: ', err)
      alert("There was an error signing you up. We're fixing it as fast as we can.")
    }
  }

  function validatePass(password) {
    return (
      /.{6,}$/.test(password) &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[0-9]+/.test(password)
    )
  }

  // update 'gardenMembership' input field whenever the piece of state is changed
  useEffect(() => setValue('gardenMembership', gardenMembership), [setValue, gardenMembership])

  return (
    <form className="signupForm" onSubmit={handleSubmit(async (data) => await onSubmit(data))}>
    {/* <form className="signupForm" onSubmit={handleSubmit(alertData)}> */}
      <div className="container">
        <h1>Sign Up!</h1>
        <div className="form-control">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            {...register("username", {
              validate: async (name) => await checkIsNameFree(name) || 'That name is taken.',
              required: "You must pick a username."
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
                validate: (value) => 
                  value === password.current || 
                  "The passwords do not match"
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
                {...register("currentPlants", { required: false })}
                type="checkbox"
                name="currentPlants"
                id="fruits"
                value="fruits"
              />
              <label htmlFor="fruits">fruits</label>
            </div>
            <div>
              <input
                {...register("currentPlants", { required: false })}
                type="checkbox"
                name="currentPlants"
                id="vegetables"
                value="vegetables"
              />
              <label htmlFor="vegetables">vegetables</label>
            </div>
            <div>
              <input
                {...register("currentPlants", { required: false })}
                type="checkbox"
                name="currentPlants"
                id="herbs"
                value="herbs"
              />
              <label htmlFor="herbs">herbs</label>
            </div>
            <div>
              <input
                {...register("currentPlants", { required: false })}
                type="checkbox"
                name="currentPlants"
                id="flowers"
                value="flowers"
              />
              <label htmlFor="flowers">flowers</label>
            </div>
            <div>
              <input
                {...register("currentPlants", { required: false })}
                type="checkbox"
                name="currentPlants"
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

  async function checkIsNameFree(name) {
    let submission = {nameData: name}
    let fetchUrl = "/api/user/check-is-name-free" 
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(submission)
    }
    
    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()

      return resObject.result
    }
    catch (err) {
      console.error('Error validating name in MongoDBAtlas Cluster!', err)
    }
  }
}

export default Signup
