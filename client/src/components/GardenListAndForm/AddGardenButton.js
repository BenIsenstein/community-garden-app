import AddGardenForm from "../AddGardenForm/AddGardenForm"
import './GardenListAndForm.css'

function AddGardenButton({setStateFunction}) {
    return ( 
        <button className ='button' onClick={() => setStateFunction()}>
            Add A Garden
        </button>  
    )
}

export default AddGardenButton