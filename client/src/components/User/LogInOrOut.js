import React, { useState, useEffect } from "react"
import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"


const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)
  console.log('authContext', authContext)
  const isLoggedIn = authContext.username !== undefined

  return isLoggedIn ? (
    <div>
      <span>Hello {authContext.username}</span>
      <button onClick={
        async () => {
          await fetch("/api/user/logout").then(
            authContext.logOut())}}>Logout</button>
      
    </div>
  ) : (
    <div>
      {/* How to bring in req.user??? */}
      <Link to="/login">
        <button onClick={
          async () => {
            authContext.logIn("Username", true)
          }
        }>Login
        </button>
      </Link>
    </div>
  )
}

export default LogInOrOut
