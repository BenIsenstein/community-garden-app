import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import EditGardenButton from "../../components/EditGardenButton";
import "./individualGarden.css"
import youngSalad from "../../components/images/young-salad.jpeg"
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
              <b>{(gardenData) && ((gardenData?.description) && 'Description: ')}</b>
              {(gardenData) && ((gardenData?.description) && (gardenData.description))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData?.plotSize) && 'Plot Size: ')}</b>
              {(gardenData) && ((gardenData?.plotSize) && (gardenData.plotSize))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData?.numberOfPlots) && 'Number of Plots: ')}</b>
              {(gardenData) && ((gardenData?.numberOfPlots) && (gardenData.numberOfPlots))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData.established) && 'Established: ')}</b>
              {(gardenData) && ((gardenData.established) && (gardenData.established))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData.vacancy) && 'Vacancy: ')}</b>
              {(gardenData) && ((gardenData.vacancy) && (gardenData.vacancy))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData.website) && 'Website: ')}</b>
              {(gardenData) && ((gardenData.website) && (gardenData.website))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData.email) && 'Email: ')}</b>
              {(gardenData) && ((gardenData.email) && (gardenData.email))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData.fee) && 'Fee: ')}</b>
              {(gardenData) && ((gardenData.fee) && (gardenData.fee))}
            </p>
            <p>
              <b>{(gardenData) && ((gardenData.wheelchairAccessible) && 'Wheelchair Accessible: ')}</b>
              {(gardenData) && ((gardenData.wheelchairAccessible) && (gardenData.wheelchairAccessible))}
            </p>
          </div>
          <div className="about-our-garden-text" style={{display: 'flex', justifyContent:'center'}}>
            <img src={youngSalad} style={{maxHeight:'80vh', maxWidth:'80vw'}}alt="" className="about-our-garden-photo"/>
          </div>
        </div>
      </div>

      <div className="messages-and-to-do">
        <div className="garden-info message-board">
          <div className="garden-info-header-container">
            <h2 className="garden-info-header">Message Board</h2>
          </div>
          <div>
            {isLoggedIn ? 
              (typeof gardenData === 'object') &&  <MessageBoard gardenId={gardenData?._id} />
              :
              <div className="must-be-logged-in-message">"Please log in to access the message board."</div>
            }
          </div>
        </div>
        <div className="garden-info to-do-list">
          <div className="garden-info-header-container">
            <h2 className="garden-info-header">To-Do List</h2>
          </div>
          <div>
            {isLoggedIn ? 
              (typeof gardenData === 'object') && <ToDoApp gardenId={gardenData?._id} />
              :
              <div className="must-be-logged-in-message">Please log in to access the to-do list.</div>
            }
          </div>
        </div>
        </div>
    </div>
  )
}
