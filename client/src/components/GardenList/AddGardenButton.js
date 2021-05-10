import AddGardenForm from "../AddGardenForm/AddGardenForm"
import '../GardenListAndForm/gardenListAndFormButtons.css'

function AddGardenButton({setStateFunction}) {
    return ( 
        <button  className ='button' onClick={() => setStateFunction(<AddGardenForm />)}>
            Add A Garden
        </button>  
    )
}

export default AddGardenButton