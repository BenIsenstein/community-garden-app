//import { Data } from "@react-google-maps/api"
//import { moment } from "moment"
import React, { useEffect, useState } from "react"
import { Dimmer, Loader } from 'semantic-ui-react'
import Forecast from './Forecast'


export default function GetForecast() {
  const [lat] = useState (51.0501)
  const [lon] = useState (-114.0853)
  const [error, setError] =useState(null)
  const [forecast, setForecast] = useState ([])

  useEffect(() => {
    const fetchForecast = async () => {
      let fetchForecastUrl = `${process.env.REACT_APP_WEATHER_API_URL}/forecast/daily?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      let response = await fetch(fetchForecastUrl)
      let data = await response.json()
      setForecast(data)
      console.log("forecast",forecast)  
      
      setError(null)
      .catch (err => {
        setError(err.message)
      })
    }
    
  fetchForecast()
  },[lat,lon, error] )


console.log("What am i?",forecast)

  if (forecast.length>0) {
  return forecast.list
  }
  console.log ('Data is true')

 /* function mapDataToWeatherInterface(forecastData) {
    const mapped = {
      date: forecastData.dt * 1000, // convert from seconds to milliseconds
      description: forecastData.weather[0].main,
      temperature: Math.round(forecastData.main.temp),
    }
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (forecastData.dt_txt) {
      mapped.dt_txt = forecastData.dt_txt
    }
    return mapped
  }
*/
    
  return (
   <div>
     <Forecast forecast = {forecast}/>
   </div>
  ) 
     
}
  