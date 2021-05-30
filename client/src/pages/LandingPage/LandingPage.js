import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import EditGardenButton from "./EditGardenButton";
import "./individualGarden.css"
import garden from "../../components/images/garden.jpeg"
import ToDoApp from "../../components/ToDo/ToDoApp"
import MessageBoard from "./MessageBoard/MessageBoard"

//this array is temporary until CRUD functions/DB access made
const DATA =[{}]

export default function LandingPage() {
  const { gardenName } = useParams()
  const [gardenData, setGardenData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let fetchGardenUrl = `/api/garden/get/${gardenName}`
      let response = await fetch(fetchGardenUrl)
      let resObject = await response.json()
      let gardenObject = resObject.garden
      
      return gardenObject ? setGardenData(gardenObject) : setGardenData('no garden')
    }
    fetchData()
  }, [gardenName])

  return (
    <div>
      <div className='garden-title'>
        <h1 style={{display: 'flex'}}>
          {!gardenData && 'Loading...'}
          {(gardenData === 'no garden') && 'This garden could not be found.'}
          {(gardenData !== 'no garden') && gardenData?.name}
        </h1>
        <div>
          {gardenData?.address}
        </div>
      </div>
      <div className="garden-info">
        <div className='garden-info-header-container'>
          <h2 className="garden-info-header">About {gardenName}</h2>
        </div>
        <div className="about-our-garden">
          <div className="about-our-garden-text">
            <p>
              {(gardenData) &&
                ((gardenData?.description) && 'Description: ' + (gardenData.description))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData?.plotSize) && 'Plot Size: ' + (gardenData.plotSize))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData?.numberOfPlots) && 'Number of Plots: ' + (gardenData.numberOfPlots))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData.established) && 'Established: ' + (gardenData.established))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData.vacancy) && 'Vacancy: ' + (gardenData.vacancy))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData.website) && 'Website: ' + (gardenData.website))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData.email) && 'Email: ' + (gardenData.email))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData.fee) && 'Fee: ' + (gardenData.fee))}
            </p>
            <p>
              {(gardenData) && 
              ((gardenData.wheelchairAccessible) && 'Wheelchair Accessible: ' + (gardenData.wheelchairAccessible))}
            </p>
       
            
            {/* <p>Reader Rock Garden Historic Park is one of Calgary's most unique cultural landscapes featuring the restored Reader house (that contains Reader's Garden Café), rock pathways, bridges, benches and beautiful flowers. Reader Rock Garden is the perfect location for group functions and events, including weddings, photography sessions and family gatherings. Book Reader Rock Garden for your function.</p> */}
          </div>
          <div className="about-our-garden-text">
            <img src={garden} alt="" className="about-our-garden-photo"/>
          </div>
        </div>
      </div>

      <div className="messages-and-to-do">
        <div className="round-background message-board">
          <h2 className="section-heading ">Message Board</h2>
          {(typeof gardenData === 'object') && <MessageBoard gardenId={gardenData?._id} />}
        </div>
        <div className="round-background to-do-list">
          <h2 className="section-heading ">To-Do List</h2>
          <ToDoApp tasks={DATA}/>
        </div>
      </div>

      <footer>
        <div>
            {(typeof gardenData === 'object') && <EditGardenButton />}
        </div>
      </footer>

    </div>


  )
}
