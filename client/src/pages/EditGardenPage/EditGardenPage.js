import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import EditGardenMap from "./EditGardenMap"
import EditGardenForm from "../../components/EditGardenForm/EditGardenForm"
import "./EditGardenPage.css"

function EditGardenPage() {
  const [formCoordinates, setFormCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const [gardenData, setGardenData] = useState({
    name: 'Loading...',
    address: 'Loading...',
    coordinates: formCoordinates,
    postalCode: 'Loading...',
    plotSize: 0,
    numberOfPlots: 0,
    quadrant: null,
    established: null,
    vacancy: null,
    website: 'Loading...',
    email: 'Loading...',
    description: 'Loading...',
    fee: 'Loading...',
    wheelchairAccessible: null
  })
  const { gardenName } = useParams()
  const sendDataFromMapToForm = (data) => setFormCoordinates(data)

  useEffect(() => {
    const fetchData = async () => {
      let fetchGardenUrl = `/api/garden/get/${gardenName}`
      let response = await fetch(fetchGardenUrl)
      let resObject = await response.json()
      let gardenObject = resObject.garden
      let coordinates = gardenObject?.coordinates

      if (gardenObject) {
        setGardenData(gardenObject) 
        setFormCoordinates({
          lat: parseFloat(coordinates.lat),
          lng: parseFloat(coordinates.lng)
        })
      }
      else {
        setGardenData({
          name: 'Garden not found.',
          address: '',
          coordinates: formCoordinates,
          postalCode: '',
          plotSize: 0,
          numberOfPlots: 0,
          quadrant: null,
          established: null,
          vacancy: null,
          website: '',
          email: '',
          description: '',
          fee: '',
          wheelchairAccessible: null
        })
      } 
    }
    
    try {fetchData()}
    catch(err) {console.error('Error fetching garden from database: ', err)}
    
  }, [gardenName])

  return (
    <div style={{ display: "flex", flexFlow: "row wrap",justifyContent: 'space-around', marginTop: '25px', marginBottom: '25px' }}>
      <div className="Edit-garden-form">
        <EditGardenForm formCoordinates={formCoordinates} gardenToEdit={gardenData} />    
      </div>
      <div className='Garden-map'>
        <EditGardenMap
          formCoordinates={formCoordinates}
          setFormCoordinates={sendDataFromMapToForm}
        />
      </div>
    </div>
  )
}

export default EditGardenPage