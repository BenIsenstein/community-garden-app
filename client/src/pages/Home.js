import { useEffect, useState } from "react"
import GardenList from "../components/GardenList/GardenList"
import ListGardensButton from "../components/GardenListAndForm/ListGardensButton"
import AddGardenButton from "../components/GardenListAndForm/AddGardenButton"
import AddGardenForm from "../components/AddGardenForm/AddGardenForm"
import GardenMap from "../components/gardenMap/GardenMapReact"
import "./Home.css"
import GetWeather from "../components/Weather/GetWeather"


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
