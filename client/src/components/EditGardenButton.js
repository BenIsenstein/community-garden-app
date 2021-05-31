import { useHistory, useParams } from "react-router-dom"
import { Button } from 'semantic-ui-react'

export default function EditGardenButton() {
    const { gardenName } = useParams()
    const history = useHistory()

    return (
      <div style={{textAlign: "center"}}>
        <Button 
          className="button" 
          style={{
            width: '150px', 
            margin: "20px", 
            backgroundColor:"#EDF5E1", 
            color:"#05386B"
          }} 
          primary 
          circular 
          onClick={() => history.push(`/garden-page/${gardenName}/edit`)}
        >
          Edit this garden
        </Button>
      </div>
    )
}