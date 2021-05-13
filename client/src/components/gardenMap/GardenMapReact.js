import React from 'react'
import { 
    GoogleMap, 
    Marker,
    InfoWindow,
    useLoadScript,
} from '@react-google-maps/api'
import mapStyles from "./mapStyles"
import markerArray from "./mapData"

require('dotenv').config()

const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}
const center = {
    lat: 51.035, 
    lng: -114.0603959887364,
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

export default function GardenMap() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const mouseMarker = (props, marker, e) => {
        this.setState({
            showInfo: true
        })
    }
    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading Maps"
    return <div>
        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={11} 
            center={center}
            options={options}
        >
            {markerArray.map(function(marker, index){
                return <Marker 
                    key={marker.title}
                    position={marker.location}
                />
            })}
        </GoogleMap>
    </div>
}