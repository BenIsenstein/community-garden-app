import { useHistory, useParams } from "react-router-dom"

export default function EditGardenButton() {
    const { gardenName } = useParams()
    const history = useHistory()

    return (
      <button onClick={() => history.push(`/garden-page/${gardenName}/edit`)}>
        Edit this garden
      </button>
    )
}