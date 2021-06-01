import React, { useEffect, useState } from "react"
import { Dimmer, Loader } from 'semantic-ui-react'
import Forecast from './Forecast'


export default function GetForecast() {
  const [lat] = useState (51.0501)
  const [lon] = useState (-114.0853)
  const [forecast, setForecast] = useState (null)

  useEffect(() => {
    const fetchForecast = async () => {
      let weatherUrl = process.env.REACT_APP_WEATHER_API_URL
      let weatherKey = process.env.REACT_APP_WEATHER_API_KEY
      let fetchForecastUrl = `${weatherUrl}/forecast/?lat=${lat}&lon=${lon}&units=metric&APPID=${weatherKey}`
      
      try {
        let response = await fetch(fetchForecastUrl)
        let resObject = await response.json()
    
        if (resObject) {setForecast(resObject.list)} 
        else {setForecast('no forecast')}
      }
      catch(err) {
        console.log('ERROR fetching forecast data: ', err)
        alert("There was an error getting forecast data. We're fixing it as fast as we can.")
      }
    }
    
    fetchForecast()
  },[lat,lon])
  
  return (
    <div className="GetForecast">
      {(forecast && forecast !== 'no forecast') 
        ? (
        <div>
          <Forecast forecast ={forecast}/>
        </div>
      ) : (  
        <div>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  )
}
   

  