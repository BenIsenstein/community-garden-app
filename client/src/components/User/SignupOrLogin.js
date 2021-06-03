import React, { useState } from "react";
import Login from "./Login"
import Signup from "./Signup"
import "./Signup.css"

function SignupOrLogin() {
  const [signupOrLogin, setSignupOrLogin] = useState(<Login/>)
  const [color, setColor] = useState("#05386B")
  const [inactiveColor, setInactiveColor] = useState('#379683')

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <button className="loginSignupButtons" style={{background:color, borderColor:color}}onClick={() => {setSignupOrLogin(<Login/>); setColor("#05386B"); setInactiveColor("#379683")}}>Log In</button>
        <button className="loginSignupButtons" style={{background:inactiveColor, borderColor:inactiveColor}}onClick={() =>  {setSignupOrLogin(<Signup/>); setColor("#379683"); setInactiveColor("#05386B")}}>Sign Up</button>
      </div>
    <div>{signupOrLogin}</div>
  </div>
  )
}

export default SignupOrLogin