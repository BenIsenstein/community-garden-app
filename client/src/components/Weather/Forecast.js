import React from "react";
import {
  List
} from "@material-ui/core";
import moment from 'moment';
import './styles.css';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Forecast ({ forecast }) {

  const WeatherIcon = styled.div`
  color: whitesmoke
`
 console.log("forecast is",forecast)

  const results = forecast.map((item) => {

    let weatherIcon = null;

    if (item.weather[0].main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    }else if (item.weather[0].main === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (item.weather[0].main === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (item.weather[0].main === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (item.weather[0] === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (item.weather[0] === 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

    return (
      <div key={forecast.indexOf(item)} className="forecast">
        <div className="flex-forecast">
        <p>{moment(item.dt_txt).format("MMMM Do")}</p>
        <p>{moment(item.dt_txt).format("h:mm a")}</p>
        <WeatherIcon style={{fontSize:20,marginTop:4}}>{weatherIcon}</WeatherIcon>
        <p>{Math.round(item.main.temp)} &deg;C</p>
        <p>Precip amount: {(item.rain && item.rain['3h']) || "0"} </p>
        <p> Wind: {Math.round(item.wind.speed)} km/hr</p>
        </div>
      </div>
    )
  })
  
    return(
      <div>
      {!forecast ? "loading" : <List aria-label="forecast">{results}</List> }
      </div>
    )
  
}





