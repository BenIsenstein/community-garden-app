import GardenList from "../GardenList/GardenList"
import './GardenListAndForm.css'


function AllGardensButton({setStateFunction}) {
    return (  
        <button className='button' onClick={() => setStateFunction()}>
            Back To Garden List
        </button> 
    )
}


export default AllGardensButton