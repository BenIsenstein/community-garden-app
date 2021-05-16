import {useEffect, useState} from 'react'
import './GardenList.css'

function GardenList() {
  const [gardenList, setGardenList] = useState([]) 

  useEffect(() => {
    async function getAllGardens() {
      let fetchUrl = "/api/get-all-gardens" 
      let response = await fetch(fetchUrl)
      let resObject = await response.json()
      let gardenList = resObject.gardenList    
      setGardenList(gardenList)
    }  

    getAllGardens()
    }, 
  []
  )  

  return (
    <div>
      <h1 className='Garden-list-header'>
        All Gardens
      </h1>
      <div className='Garden-list'>
        {gardenList.map((garden) => (
          <div key={garden.name} className='Garden-list-element'>
            <div className='Garden-sub-element'>
              {garden.name}
            </div>
            <div className='Garden-sub-element'>
              Address: {garden.address}
            </div>
            <div className='Garden-sub-element'>
              <div>Coordinates:&emsp;&emsp;</div> 
              <div> 
                Lat: {garden.coordinates ? garden.coordinates.lat : 'No Lat'}
                <br />
                Lng: {garden.coordinates ? garden.coordinates.lng : 'No Lng'}
              </div>
            </div>
            <div className='Garden-sub-element'>
              Quadrant: {garden.quadrant}
            </div>
            <div className='Garden-sub-element'>
              Cover Photo: {garden.coverPhoto || 'No Cover Photo'}
            </div>
            <div className='Garden-sub-element'>
              Size: {garden.surfaceArea} sqft
            </div>
            <div className='Garden-sub-element'>
              Vacancy: {garden.vacancy ? 'yes' : 'no'}
            </div>
            <br />
          </div>  
        ))}
      </div>
    </div>
  )
}

export default GardenList
