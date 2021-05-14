import {useEffect, useState} from 'react'
import GardenList from '../GardenList/GardenList'
import AllGardensButton from './AllGardensButton'
import AddGardenButton from './AddGardenButton'
import AddGardenForm from '../AddGardenForm/AddGardenForm'
import GardenMap from '../gardenMap/GardenMapReact'
import './GardenListAndForm.css'


function GardenListAndForm() {
    const [currentDisplay, setCurrentDisplay] = useState(<GardenList />)
    const [formCoordinates, setFormCoordinates] = useState (
        {
            lat: 0,
            lng: 0
        }
    )

    



    return(
        <div style={{display: 'flex'}}>
            <div className='Garden-list-and-form'>
                <div className='Garden-list-and-form-buttons'>
                    <AddGardenButton setStateFunction={() => setCurrentDisplay(<AddGardenForm formCoordinates={formCoordinates}/>)} />
                    <AllGardensButton setStateFunction={() => setCurrentDisplay(<GardenList />)} />
                </div>
                <div>
                    {currentDisplay}
                </div>
            </div>
            <GardenMap  
                currentDisplay={currentDisplay}
                formCoordinates={formCoordinates}
                setFormCoordinates={setFormCoordinates}
            />
        </div>
    )
}


export default GardenListAndForm