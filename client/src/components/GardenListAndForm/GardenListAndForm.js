import { useEffect, useState } from "react"
import GardenList from "../GardenList/GardenList"
import ListGardensButton from "./ListGardensButton"
import AddGardenButton from "./AddGardenButton"
import AddGardenForm from "../AddGardenForm/AddGardenForm"
import GardenMap from "../gardenMap/GardenMapReact"
import "./GardenListAndForm.css"
import GetWeather from "../Weather/GetWeather"


function GardenListAndForm() {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  const [formCoordinates, setFormCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const sendDataFromMapToForm = (data) => setFormCoordinates(data)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: 'space-around', marginTop: '25px', marginBottom: '25px' }}>
        <div className="Garden-list-and-form">
          <div className="Garden-list-and-form-buttons">
            <ListGardensButton setStateFunction={() => setIsFormDisplayed(false)} />
            <AddGardenButton setStateFunction={() => setIsFormDisplayed(true)} />
          </div>
          {isFormDisplayed 
            ? <AddGardenForm formCoordinates={formCoordinates} /> 
            : <GardenList />
          }
        </div>
        <div className='Garden-map'>
          <GardenMap
            isFormDisplayed={isFormDisplayed}
            formCoordinates={formCoordinates}
            setFormCoordinates={sendDataFromMapToForm}
          />
        </div>
      </div>
      <div style={{ maxWidth:"fit-content"}}>
          <GetWeather />
      </div>
    </div>
  )
}

export default GardenListAndForm
