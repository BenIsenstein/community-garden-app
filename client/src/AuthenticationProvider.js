
import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

// UPDATE FOR GARDENING APP
const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState()
    let [isAdministrator, setIsAdministrator] = useState(false)

    const logIn = (loginUsername, loginAdministrator ) => {
        setUsername(loginUsername)
        setIsAdministrator(loginAdministrator)
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
