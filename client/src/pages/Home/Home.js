import { useState } from "react"
import ListGardensButton from "../../components/GardenListAndForm/ListGardensButton"
import AddGardenButton from "../../components/GardenListAndForm/AddGardenButton"
import AddGardenForm from "../../components/AddGardenForm/AddGardenForm"
import GardenMap from "../../components/gardenMap/GardenMap"
import "./Home.css"
import "../../App.css"
import GetWeather from "../../components/Weather/GetWeather"
import GardenTable from "../../components/DataTable/GardenTable"
import squashes from "../images/squashes.jpg"
import { Icon } from "semantic-ui-react"


function Homepage() {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  const [formCoordinates, setFormCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const sendDataFromMapToForm = (data) => setFormCoordinates(data)

  return (
    <div>
      <div className="welcome-and-weather" style={{ display: "flex", justifyContent: "center"}}>
        <div className="main">
          <div className="top">
            <h1 class="section-heading header">Welcome to Calgary Community Gardens!</h1>
          </div>
        <div className="welcome-and-weather-content">
          <div>
            <p>
            From finding a garden to checking a forecast, this site helps facilitate your gardening growth. Community gardening is a way to meet neighbours of all ages, share knowledge, and make friends, while growing healthy produce in an economical way.
            </p>
          </div>
          <div class="about-our-garden-text">
              <img src={squashes} alt="" className="about-our-garden-photo"/>
          </div>
        </div>
      </div>
        <div>
          <GetWeather />
        </div>
      </div>
      <div className="get-involved">
        <div>
          <div style={{marginTop: "30px"}}>
            <h1 class="round-background-heading"><Icon className="arrow" name='arrow down' />Search below for your local garden<Icon className="arrow" name='arrow down' /></h1>
            
          </div>
        </div>
      </div>

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
      
    </div>
  )
}

export default Homepage
