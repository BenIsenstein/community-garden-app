import {useState} from 'react'
import GardenList from '../GardenList/GardenList'
import AllGardensButton from './AllGardensButton'
import AddGardenButton from './AddGardenButton'
import './GardenListAndForm.css'


function GardenListAndForm() {
    const [currentDisplay, setCurrentDisplay] = useState(<GardenList />)

    return(
        <div className='Garden-list-and-form'>
            <div className='gardenlistandformbuttons'>
                <AddGardenButton setStateFunction={setCurrentDisplay} />
                <AllGardensButton setStateFunction={setCurrentDisplay} />
            </div>
            <div>
                {currentDisplay}
            </div>
        </div>
    )
}


export default GardenListAndForm