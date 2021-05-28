import { useContext } from "react"
import AuthenticationContext from "../../AuthenticationContext"

const AdministratorOnly = ({children}) => {
    const authContext = useContext(AuthenticationContext)
    return (authContext.isAdministrator) ? children : null 
}

export default AdministratorOnly