import React from 'react'
import GardenListAndForm from "./components/GardenListAndForm/GardenListAndForm"
import GetWeather from "./components/Weather/GetWeather"


const Homepage = () => {
    return (
        <div>
            <GardenListAndForm />
            <GetWeather />
        </div>
    )
}

export default Homepage