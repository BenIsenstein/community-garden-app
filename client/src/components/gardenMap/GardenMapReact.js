import React from 'react'
import { 
    GoogleMap, 
    Marker,
    InfoWindow,
    useLoadScript,
} from '@react-google-maps/api'
import mapStyles from "./mapStyles.js";

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
let markerArray = [
  [{ lat: 51.12828642120469, lng: -114.17890810185442}, "Hawkwood"],
  [{ lat: 51.10070132242482, lng: -114.13610715362458}, "Brentwood"],
  [{ lat: 51.09304721792646, lng: -114.14932508000413}, "Varsity"]
]
export default function GardenMap() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

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
                    key={ index }
                    position={marker[0]}
                />
            })}
        </GoogleMap>
    </div>
}