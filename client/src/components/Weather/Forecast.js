import React from "react";
import {
  List
} from "@material-ui/core";
import moment from 'moment';
import './weatherStyles.css';
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

  // background color options
  let forecastBackgroundColors = {  
    0: "CornflowerBlue",
    1: "DarkOliveGreen",
    2: "DarkKhaki"
  }
  // value holders to compare whether the date of the forecast segment has changed
  let newDayCount = 0
  let previousMonthAndDay = undefined
  let totalRain = 0

  const results = forecast.map((item) => {
    // Add precip to totalRain
    if (item.rain) {totalRain += item.rain['3h']}

    // ------------- SETTING COLORS OF THE FORECAST SEGMENTS ------------------

    // put the date of the forecast segment into a variable
    let currentMonthAndDay = moment(item.dt_txt).format("MMMM Do")

    // compare previous date to the date of the current segment,
    // +1 to newDayCount if the date has changed
    if (currentMonthAndDay !== previousMonthAndDay) {newDayCount++}

    // divide by 3 and use the remainder to access a color in forecastBackgroundColors
    let currentDayColor = forecastBackgroundColors[newDayCount % 3]

    // define a style object to apply to the div
    let backgroundColorStyle = {backgroundColor: currentDayColor}

    // set the previousMonthAndDay variable to the date we used for this segment
    previousMonthAndDay = currentMonthAndDay

    // -----------------------------------------------------------------------------

    let weatherIcon = null;

    if (item.weather[0].main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (item.weather[0].main === 'Drizzle') {
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
      <div key={forecast.indexOf(item)} className="forecast" style={backgroundColorStyle}>
        <div className="flex-forecast">
        <p>{moment(item.dt_txt).format("MMMM Do")}</p>
        <p>{moment(item.dt_txt).format("h:mm a")}</p>
        <WeatherIcon style={{fontSize:20,marginTop:4}}>{weatherIcon}</WeatherIcon>
        <p>{Math.round(item.main.temp)} &deg;C</p>
        <p>{(item.rain && "Precip:  " + item.rain['3h']) || "No precip"} </p>
        <p> Wind: {Math.round(item.wind.speed)} km/hr</p>
        <p> Max rain: {Math.max(item.rain && item.rain['3h']) || "None"} </p>
        </div>
      </div>
    )
  })

  // Add Total-rain-header at the bottom
  results.push(
    <div key={"precip sum"} className="forecast">
      <div className="flex-forecast">
      <h2 className="Total-rain-header">Total rain in the next five days: {totalRain}</h2>
      </div>
    </div>
  )
  
  return (
    <div>
    {!forecast ? "loading" : <List aria-label="forecast">{results}</List> }
    </div>
  )
  
}





