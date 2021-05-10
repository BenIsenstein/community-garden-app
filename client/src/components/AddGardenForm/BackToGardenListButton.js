import GardenList from "../GardenList/GardenList"
import '../GardenListAndForm/gardenListAndFormButtons.css'


function BackToGardenListButton({setStateFunction}) {
    return (  
        <button className='button' onClick={() => setStateFunction(<GardenList />)}>
            Back To Garden List
        </button> 
    )
}


export default BackToGardenListButton