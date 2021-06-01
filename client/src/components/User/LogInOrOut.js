import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthenticationContext from "../../AuthenticationContext"

const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)
  console.log('authContext', authContext)
  const isLoggedIn = authContext.username !== undefined

  return (
    <div style={{color: 'white'}}>
      {isLoggedIn 
        ? (
          <div>
            <span>Hello {authContext.username} | </span>
            <button onClick={async () => await authContext.logOut()}>Logout</button>   
          </div>    
        ) 
        : (
          <Link to="/login">
            Login
          </Link>
        )
      }
    </div>   
  )
}

export default LogInOrOut
