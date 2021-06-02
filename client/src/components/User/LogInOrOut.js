import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthenticationContext from "../../AuthenticationContext"

const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)
  const isLoggedIn = authContext.username !== undefined

  return (
    <div style={{color: 'white'}}>
      {isLoggedIn 
        ? (
          <div>
            <span>Hello {authContext.username} &nbsp;&nbsp; </span>
            <button 
              style={{            
                backgroundColor:"#EDF5E1", 
                color:"#05386B",
                borderRadius:'10em',
                padding: '2px 10px 2px 10px',
              }}
              onClick={async () => await authContext.logOut()}>Logout</button>   
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
