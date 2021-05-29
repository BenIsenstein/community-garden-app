import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import EditGardenButton from "./EditGardenButton";
import "../../components/Weather/styles.css"
import squashes from "../../pages/images/squashes.jpg"
import ToDoApp from "../../components/ToDo/ToDoApp"
import MessageBoard from "./MessageBoard/MessageBoard"

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
      <h1 style={{display: 'flex'}}>
        {!gardenData && 'Loading...'}
        {(gardenData === 'no garden') && 'This garden could not be found.'}
        {(gardenData !== 'no garden') && gardenData?.name}

      </h1>
      <div>
        {gardenData?.address}
      </div>

      <div class="round-background">
        <h2 class="section-heading">About Our Garden</h2>
        <div class="about-our-garden">
          <div class="about-our-garden-text">
            <p>Reader Rock Garden Historic Park is one of Calgary's most unique cultural landscapes featuring the restored Reader house (that contains Reader's Garden Café), rock pathways, bridges, benches and beautiful flowers. Reader Rock Garden is the perfect location for group functions and events, including weddings, photography sessions and family gatherings. Book Reader Rock Garden for your function.</p>
          </div>
          <div class="about-our-garden-text">
            <img src={squashes} alt="" className="about-our-garden-photo"/>
          </div>
        </div>
      </div>

      <div class="messages-and-to-do">
        <div class="round-background message-board">
          <h2 class="section-heading ">Message Board</h2>
          {(typeof gardenData === 'object') &&  
            <MessageBoard gardenId={gardenData?._id}/>
          }
        </div>
        <div class="round-background to-do-list">
          <h2 class="section-heading ">To-Do List</h2>
          <p>{ToDoApp}</p>
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
