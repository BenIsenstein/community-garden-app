import { useHistory, useParams } from "react-router-dom"
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

export default function EditGardenButton() {
    const { gardenName } = useParams()
    const history = useHistory()

    return (
      <Button className="button" primary circular onClick={() => history.push(`/garden-page/${gardenName}/edit`)}>
        Edit this garden
      </Button>
    )
}