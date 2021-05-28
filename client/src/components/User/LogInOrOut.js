import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthenticationContext from "../../AuthenticationContext"

const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)
  console.log('authContext', authContext)
  const isLoggedIn = authContext.username !== undefined

  const fetchLogout = async () => {
    try {
      let response = await fetch("/api/user/logout")
      let resObject = await response.json()

      if (resObject.isLoggedOut) {
        authContext.logOut() 
        alert('Logged out.')
      }
      else {
        alert('You are still logged in for some reason. Please try logging out again.')
      }
    }
    catch(err) {
      console.log(`Error logging out user ${authContext.username}: `, err)
      alert('There was an error logging you out. We are fixing it as fast as we can.')
    }
  }

  return <div style={{color: 'white'}}>
      {isLoggedIn 
        ? (
          <div>
            <span>Hello {authContext.username} | </span>
            <button onClick={async () => await fetchLogout()}>
              Logout
            </button>   
          </div>    
        ) 
        : (
          <Link to="/login">
            Login
          </Link>
        )
      }
    </div>   
}

export default LogInOrOut
