import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import EditGardenButton from "../../components/EditGardenButton";
import "./individualGarden.css"
import garden from "../../components/images/garden.jpeg"
import ToDoApp from "../../components/ToDo/ToDoApp"
import MessageBoard from "../../components/MessageBoard/MessageBoard"
import AuthenticationContext from "../../AuthenticationContext"


export default function LandingPage() {
  const { gardenName } = useParams()
  const [gardenData, setGardenData] = useState(undefined);
  const authContext = useContext(AuthenticationContext)
  console.log('authContext', authContext)
  const isLoggedIn = authContext.username !== undefined

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
    <div className="pageBody">
      <div className="garden-title-and-edit">
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
        <div>
          {(typeof gardenData === 'object') && <EditGardenButton />}
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
          </div>
          <div className="about-our-garden-text">
            <img src={garden} alt="" className="about-our-garden-photo"/>
          </div>
        </div>
      </div>

      <div className="messages-and-to-do">
        <div className="garden-info message-board">
          <div className="garden-info-header-container">
            <h2 className="garden-info-header">Message Board</h2>
          </div>
          <div className="must-be-logged-in-message">
            {isLoggedIn ? 
              (typeof gardenData === 'object') &&  <MessageBoard gardenId={gardenData?._id} />
              :
              "Please log in to access the message board."
            }
          </div>
        </div>
        <div className="garden-info to-do-list">
          <div className="garden-info-header-container">
            <h2 className="garden-info-header">To-Do List</h2>
          </div>
          <div className="must-be-logged-in-message">
            {isLoggedIn ? 
              (typeof gardenData === 'object') && <ToDoApp gardenId={gardenData?._id} />
              :
              "Please log in to access the to-do list."
            }
          </div>
        </div>
        </div>
    </div>
  )
}
