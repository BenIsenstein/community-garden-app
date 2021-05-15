import {useEffect, useState} from 'react'
import GardenList from '../GardenList/GardenList'
import ListGardensButton from './ListGardensButton'
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

    const sendDataFromMapToForm = (data) => {
        setFormCoordinates(data)
        console.log('set coordinates inside map: ', formCoordinates)
    }

    return (
        <div style={{display: 'flex'}}>
            <div className='Garden-list-and-form'>
                <div className='Garden-list-and-form-buttons'>
                    <AddGardenButton setStateFunction={() => setCurrentDisplay(<AddGardenForm formCoordinates={formCoordinates}/>)} />
                    <ListGardensButton setStateFunction={() => setCurrentDisplay(<GardenList />)} />
                </div>
                Lat: {formCoordinates.lat} Lng: {formCoordinates.lng}
                <div>
                    {currentDisplay}
                </div>
            </div>
            <GardenMap  
                currentDisplay={currentDisplay}
                formCoordinates={formCoordinates}
                parentCallback={sendDataFromMapToForm}
            />
        </div>
    )
}


export default GardenListAndForm