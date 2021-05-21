import { Data } from "@react-google-maps/api"
import React, { useEffect, useState } from "react"
import { Dimmer, Loader } from 'semantic-ui-react'
import Forecast from './Forecast'


export default function GetForecast() {
  const [lat] = useState (51.0501)
  const [lon] = useState (-114.0853)
  const [forecastData, setForecastData] = useState ([])

  useEffect(() => {
    const fetchForecast = async () => {
      let fetchForecastUrl = `${process.env.REACT_APP_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      let response = await fetch(fetchForecastUrl)
      let result = await response.json()
      
      console.log(result)
  
  }
    
  fetchForecast()
}, [lat,lon])
/*
return (
  <div>
   {!forecastData && 'Loading...'}
   {(forecastData=== 'no forecast') && 'This forecast could not be found.'}
  {(forecastData!== 'no forecast') && forecastData?.name}
  </div>
)
}
 /* if (result.entries(forecastData).length>0) {
  return forecastData.list
  }

 function mapDataToWeatherInterface(forecastData) {
    const mapped = {
      date: forecastData.dt * 1000, // convert from seconds to milliseconds
      description: forecastData.weather[0].main,
      temperature: Math.round(forecastData.main.temp),
    };
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (forecastData.dt_txt) {
      mapped.dt_txt = forecastData.dt_txt;
    }
    return mapped;
  }*/
 /* function mapDataToWeatherInterface(forecastData) {
    const mapped = {
      date: forecastData.dt * 1000, // convert from seconds to milliseconds
      description: forecastData.weather[0].main,
      temperature: Math.round(forecastData.main.temp),
    };
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (forecastData.dt_txt) {
      mapped.dt_txt = forecastData.dt_txt;
    }
    
   return mapped;*/


  return (
    <div className="GetForecast">
      {(typeof forecastData.main != 'undefined') ? (
        <div>
          <Forecast forecast = {forecastData}/>
        </div>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
)
}
  