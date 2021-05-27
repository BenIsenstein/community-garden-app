import './ListFormButtons.css'

function AddGardenButton({setStateFunction}) {
    return ( 
        <button className ='Add-garden-button' onClick={() => setStateFunction()}>
            Add A Garden
        </button>  
    )
}

export default AddGardenButton