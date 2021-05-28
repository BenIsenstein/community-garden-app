import { useState } from "react"
import ListGardensButton from "../../components/GardenListAndForm/ListGardensButton"
import AddGardenButton from "../../components/GardenListAndForm/AddGardenButton"
import AddGardenForm from "../../components/AddGardenForm/AddGardenForm"
import GardenMap from "../../components/gardenMap/GardenMap"
import "./Home.css"
import GetWeather from "../../components/Weather/GetWeather"
import GardenTable from "../../components/DataTable/GardenTable"


function Homepage() {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  const [formCoordinates, setFormCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const sendDataFromMapToForm = (data) => setFormCoordinates(data)

  return (
    <div>
      <div style={{ display: "flex", flexFlow: "row wrap",justifyContent: 'space-around', marginTop: '25px', marginBottom: '25px' }}>
        <div style={{marginTop:'20px'}}>
          {isFormDisplayed 
            ? <AddGardenForm className="Garden-list-and-form" formCoordinates={formCoordinates} /> 
            : <GardenTable />
          }
          <div className="Garden-list-and-form-buttons">
            {isFormDisplayed 
              ? <ListGardensButton setStateFunction={() => setIsFormDisplayed(false)} />
              : <AddGardenButton setStateFunction={() => setIsFormDisplayed(true)} /> 
            }
          </div>
        </div>
        <div className='Garden-map'>
          <GardenMap
            isFormDisplayed={isFormDisplayed}
            formCoordinates={formCoordinates}
            setFormCoordinates={sendDataFromMapToForm}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
          <GetWeather />
      </div>
    </div>
  )
}

export default Homepage
