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
      <div className='Garden-display-container'>
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
      <div className='Garden-display-container'>
        <GetWeather />
        <div className='Vision-statement'>
          <h1>Vision Statement</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Nisl rhoncus mattis rhoncus urna neque viverra. Purus sit amet luctus venenatis lectus magna fringilla. Fermentum iaculis eu non diam. 
            Laoreet sit amet cursus sit. Sit amet purus gravida quis blandit turpis cursus. Maecenas pharetra convallis posuere morbi leo urna. 
            Vestibulum lectus mauris ultrices eros in cursus turpis. Pellentesque nec nam aliquam sem et tortor. Senectus et netus et malesuada fames. 
            Ut faucibus pulvinar elementum integer enim neque. Accumsan in nisl nisi scelerisque eu ultrices. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit. 
            Adipiscing elit pellentesque habitant morbi tristique.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Homepage
