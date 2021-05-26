import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import "./GardenList.css"

function GardenList() {
  const [gardenList, setGardenList] = useState(null)
  const getAllGardens = async () => {
    let fetchUrl = "/api/garden/get"
    let response = await fetch(fetchUrl)
    let resObject = await response.json()
    let listResult = resObject.gardenList
    setGardenList(listResult)
  }

  const history = useHistory()
  const changeRoute = (val) => history.push(`/garden-page/${val}`)

  useEffect(() => {
    getAllGardens()
  }, [])
  


  return (
    <div>
      <h1 className="Garden-list-header">All Gardens</h1>
      <div className="Garden-list">
        {!gardenList 
          ? <h1>'Loading...'</h1> 
          : gardenList.map((garden) => (
          <div key={garden.name} className="Garden-list-element">
            <div onClick={() => changeRoute(garden.name)} id='Garden-name' className="Garden-sub-element">{garden.name}</div>
            <div className="Garden-sub-element">
              Address: {garden.address || "No Street Address"}
            </div>
            <div className="Garden-sub-element">
              <div>Coordinates:&emsp;</div>
              <div>
                Lat: {garden.coordinates ? garden.coordinates.lat : "No Lat"}
                <br />
                Lng: {garden.coordinates ? garden.coordinates.lng : "No Lng"}
              </div>
            </div>
            <div className="Garden-sub-element">Quadrant: {garden.quadrant}</div>
            <div className="Garden-sub-element">
              Cover Photo: {garden.coverPhoto || "No Cover Photo"}
            </div>
            <div className="Garden-sub-element">Size: {garden.surfaceArea} sqft</div>
            <div className="Garden-sub-element">Vacancy: {garden.vacancy ? "yes" : "no"}</div>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GardenList
