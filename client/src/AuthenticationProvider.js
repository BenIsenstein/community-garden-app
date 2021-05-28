
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthenticationContext from './AuthenticationContext'

// UPDATE FOR GARDENING APP
const AuthenticationProvider = ({ children }) => {
    let history = useHistory()
    const redirectHome = () => history.push('/')

    const [username, setUsername] = useState()
    const [isAdministrator, setIsAdministrator] = useState(false)

    const logIn = async (data) => {
      let fetchUrl = "/api/user/login"
      let fetchOptions = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }

      try {
        let response = await fetch(fetchUrl, fetchOptions)

        // they are not currently logged in, but passport authentication failed
        if (response.status === 401) {
          alert('Unable to log in. Please make sure your login info is correct.')
          return
        }

        let resObject = await response.json()  

        // they are already logged in
        if (resObject.isAlreadyLoggedIn) {
          alert('You are already logged in. Please log out before logging in as a different gardener.')
        }
        // success logging in server-side
        else {
          setUsername(resObject.username) 
          redirectHome()
          alert(`Logged in as ${resObject.username}`)
        }
      }
      catch(err) {
        // reset context
        setUsername(undefined)
        // logout the user server-side, incase they were logged in before error occurred
        try {await fetch('/api/user/logout')} 
        catch(err) {console.log('error logging out: ', err)}
        // log error and communicate with user
        console.log('Error sending fetch to login router: ', err)
        alert("There was an error logging you in. We're fixing it as fast as we can.")
      } 
    }

    const logOut = () => {
        setUsername(undefined)
        setIsAdministrator(false)
    }

    let contextValue = {
        username, 
        isAdministrator,
        logIn,
        logOut
    }

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            { children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
