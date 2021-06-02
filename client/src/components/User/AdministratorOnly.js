import { useContext } from "react"
import AuthenticationContext from "../../auth/AuthenticationContext"

const AdministratorOnly = ({children}) => {
    const authContext = useContext(AuthenticationContext)
    return (authContext.isAdministrator) ? children : null 
}

export default AdministratorOnly