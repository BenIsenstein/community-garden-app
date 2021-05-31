import { useHistory, useParams } from "react-router-dom"
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

export default function EditGardenButton() {
    const { gardenName } = useParams()
    const history = useHistory()

    return (
      <div style={{textAlign: "center"}}>
        <Button className="button" style={{width: '80%', margin: "20px", backgroundColor:"#05386B", color:"#EDF5E1"}} primary circular onClick={() => history.push(`/garden-page/${gardenName}/edit`)}>
          Edit this garden
        </Button>
      </div>
    )
}