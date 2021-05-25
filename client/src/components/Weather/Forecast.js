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
//import { Item } from "semantic-ui-react";


export default function Forecast ({ forecast }) {

  const WeatherIcon = styled.div`
  color: whitesmoke
`

  const results = forecast.map((item) => {

    let weatherIcon = null;
    let timeMoment 

    if (item.weather[0].main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
      timeMoment = item.Thunderstorm.dt_txt
    }else if (item.weather[0].main === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
      timeMoment = item.Drizzle.dt_txt
    } else if (item.weather[0].main === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      timeMoment = item.clouds.dt_txt
    } else if (item.weather[0].main === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
      timeMoment = item.Snow.dt_txt
    } else if (item.weather[0] === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
      timeMoment = item.Clear.dt_txt
    } else if (item.weather[0] === 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
      timeMoment = item.Clouds.dt_txt
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
      timeMoment = item.Smog.dt_txt
    }

    return (
      <div key={forecast.indexOf(item)} className="forecast">
        <div className="flex-forecast">
        <p>{moment(timeMoment).format("dddd")}</p>
        <WeatherIcon style={{fontSize:25,marginTop:4}}>{weatherIcon}</WeatherIcon>
        <p>
          {item.main.temp} &deg;C
        </p>
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


