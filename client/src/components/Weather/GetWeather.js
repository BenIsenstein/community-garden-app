import React, { useEffect, useState } from "react";
import { Loader } from 'semantic-ui-react';
import Weather from './Weather';

export default function GetWeather() {
  const [lat] = useState (51.0501)
  const [lon] = useState (-114.0853)
  const [data, setData] = useState ([])

  useEffect(() => {
    const fetchData = async () => { 
      let weatherUrl = process.env.REACT_APP_WEATHER_API_URL
      let weatherKey = process.env.REACT_APP_WEATHER_API_KEY
      let fetchUrl = `${weatherUrl}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${weatherKey}`

      try {
        let response = await fetch(fetchUrl)
        let resObject = await response.json()
        setData(resObject)
      }
      catch(err) {
        console.log('ERROR fetching weather data: ', err)
        alert("We are unable to get weather information at the moment. We're fixing it as fast as we can.")
      }
    }

    fetchData()
  }, [lat,lon]) 


  return <Weather weatherData={data}/>        
}

