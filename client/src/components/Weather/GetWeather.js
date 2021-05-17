//
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import weather from './weather';

 export default function GetWeather() {
  const [lat] = useState (51.0501);
  const [lon] = useState (-114.0853);
  const [data, setData] = useState ([]);

  useEffect(() => {
    const fetchData = async () => { 

    await fetch(`${process.env.REACT_APP_WEATHER_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      console.log(result);
    });

  }
    fetchData();
}, [lat,lon])

  return (
    <div className="GetWeather">
      {(typeof data.main != 'undefined') ? (
        <div>
          <weather weatherData={data}/>
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

