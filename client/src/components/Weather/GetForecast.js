import React, { useEffect, useState } from "react"
import { Dimmer, Loader } from 'semantic-ui-react'
import Forecast from './Forecast'

export default function GetForecast() {
  const [lat] = useState (51.0501)
  const [lon] = useState (-114.0853)
  const [forecast, setForecast] = useState ([])

  useEffect(() => {
    const fetchForecast = async () => { 

    await fetch(`${process.env.REACT_APP_WEATHER_API_URL}/forecast/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setForecast(result)
      console.log(result)
    }); 

  }

   fetchForecast()
}, [lat,lon]) 

 /*   await fetch(`${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setForecast(result)
        console.log(result);
        if (Object.entries(forecast).length) {
          return forecast.list
            .filter(forecast => forecast.dt_txt.match(/09:00:00/))
            .map(mapDataToWeatherInterface);
        }
      });
  }

 function mapDataToWeatherInterface(forecast) {
    const mapped = {
      date: forecast.dt * 1000, // convert from seconds to milliseconds
      description: forecast.weather[0].main,
      temperature: Math.round(forecast.main.temp),
    }; 
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (forecast.dt_txt) {
      mapped.dt_txt = forecast.dt_txt;
    }
    return mapped;
  }*/

  return (
    <div className="GetForecast">
      {(typeof forecast.main != 'undefined') ? (
        <div>
          <Forecast weatherData={forecast}/>
        </div>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

