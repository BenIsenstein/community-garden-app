import AddGardenForm from "../AddGardenForm/AddGardenForm"
import './GardenListAndForm.css'

function AddGardenButton({setStateFunction}) {
    return ( 
        <button className ='button' onClick={() => setStateFunction(<AddGardenForm />)}>
            Add A Garden
        </button>  
    )
}

export default AddGardenButton