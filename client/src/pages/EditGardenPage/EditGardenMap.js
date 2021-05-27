import React, { useEffect, useState, useMemo } from "react"
import { useHistory } from 'react-router-dom'
import {
  GoogleMap,
  Marker,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"

const libraries = ["places"]
const mapContainerStyle = {
  width: "450px",
  height: "625px"
}
const center = {
  lat: 51.01,
  lng: -114.1
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function GardenMap({
  formCoordinates,
  setFormCoordinates
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })


  const history = useHistory()
  const changeRoute = (val) => history.push(`/garden-page/${val}`)

   

  const onMapClick = React.useCallback(
    (event) => {
      setFormCoordinates({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    },
    [setFormCoordinates]
  )

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10.5}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        
        <Marker
          key={"created_marker"}
          position={{ lat: formCoordinates.lat, lng: formCoordinates.lng }}
          /* icon={{
                  url: "/vegetables.svg",
                  scaledSize: new window.google.maps.Size(30,30),
                  origin: new window.google.maps.Point(0,0),
                  anchor: new window.google.maps.Point(15,15)
              }} */
        />

      </GoogleMap>
    </div>
  )
}
