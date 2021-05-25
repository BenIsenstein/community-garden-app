import { moment } from "moment"
import React, { useEffect, useState } from "react"
import { Dimmer, Loader } from 'semantic-ui-react'
import Forecast from './Forecast'


export default function GetForecast() {
  const [lat] = useState (51.0501)
  const [lon] = useState (-114.0853)
  const [forecast, setForecast] = useState (null)
 // const [error, setError] =useState(null)
  

  useEffect(() => {
    const fetchForecast = async () => {
     // let fetchForecastUrl = `${process.env.REACT_APP_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      let fetchForecastUrl = `https://pro.openweathermap.org/data/2.5/forecast?lat=51.050&lon=-114.0853&units=metric&APPID=343be121d39acc6b7c438003f0fe1e30`
      let response = await fetch(fetchForecastUrl)
      let resObject = await response.json()
       
      console.log ("resObject is", resObject)
    
  
      return resObject ? setForecast(resObject.list) : setForecast('no forecast')
      
      }

    //  setError(null)
    //  .catch (error => {
    //    setError(error.message)
    //  })
 
  fetchForecast()
  },[lat,lon] )

  console.log('Forecast length is', forecast?.length)
  
  return (
      <div className="GetForecast">
        {( forecast ) ? (
          <div>
            <Forecast forecast ={forecast}/>
          </div>
        ) : (  
          <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
          </div>
        )}
    </div>
  )
}
   

  