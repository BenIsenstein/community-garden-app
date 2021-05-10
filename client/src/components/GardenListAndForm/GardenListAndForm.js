import {useState} from 'react'
import GardenList from '../GardenList/GardenList'
import BackToGardenListButton from '../AddGardenForm/BackToGardenListButton'
import AddGardenButton from '../GardenList/AddGardenButton'
import './gardenListAndFormButtons.css'


function GardenListAndForm() {
    const [currentDisplay, setCurrentDisplay] = useState(<GardenList />)

    return(
        <div>
            <div className='gardenlistandformbuttons'>
                <AddGardenButton setStateFunction={setCurrentDisplay} />
                <BackToGardenListButton setStateFunction={setCurrentDisplay} />
            </div>
            <div>
                {currentDisplay}
            </div>
        </div>
    )
}


export default GardenListAndForm