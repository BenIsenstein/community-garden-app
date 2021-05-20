import { useEffect, useState } from "react"
import GardenList from "../GardenList/GardenList"
import ListGardensButton from "./ListGardensButton"
import AddGardenButton from "./AddGardenButton"
import AddGardenForm from "../AddGardenForm/AddGardenForm"
import GardenMap from "../gardenMap/GardenMapReact"
import "./GardenListAndForm.css"

function GardenListAndForm() {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  const [formCoordinates, setFormCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const sendDataFromMapToForm = (data) => setFormCoordinates(data)

  return (
    <div style={{ display: "flex" }}>
      <div className="Garden-list-and-form">
        <div className="Garden-list-and-form-buttons">
          <AddGardenButton setStateFunction={() => setIsFormDisplayed(true)} />
          <ListGardensButton setStateFunction={() => setIsFormDisplayed(false)} />
        </div>
        {isFormDisplayed 
          ? <AddGardenForm formCoordinates={formCoordinates} /> 
          : <GardenList />
        }
      </div>
      <GardenMap
        isFormDisplayed={isFormDisplayed}
        formCoordinates={formCoordinates}
        setFormCoordinates={sendDataFromMapToForm}
      />
    </div>
  )
}

export default GardenListAndForm
