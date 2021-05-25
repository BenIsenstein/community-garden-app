import React, { useEffect, useState, useMemo } from "react"
import { useHistory } from 'react-router-dom'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"
import markerArray from "./mapData"

require("dotenv").config()

const libraries = ["places"]
const mapContainerStyle = {
  width: "450px",
  height: "625px"
}
const center = {
  lat: 51.035,
  lng: -114.0603959887364
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function GardenMap({
  isFormDisplayed,
  formCoordinates,
  setFormCoordinates
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  // This is passed through the first Marker array
  const loadingMessage = [{name: 'Loading...', address: "This won't take long!", "coordinates":{"lat":"0","lng":"0"}}]
  const [gardenList, setGardenList] = useState(loadingMessage)
  
  useEffect(() => {
    const getAllGardens = async () => {
      let fetchUrl = "/api/get-all-gardens"
      let response = await fetch(fetchUrl)
      let resObject = await response.json()
      let listResult = resObject.gardenList

      setGardenList(listResult)
    }
    getAllGardens()
  }, [])

  const history = useHistory()
  const changeRoute = (val) => history.push(`/garden-page/${val}`)

  // Prevent re-rendering of data
  const data = useMemo(() => gardenList, [gardenList])
  console.log(data) 

  const onMapClick = React.useCallback(
    (event) => {
      setFormCoordinates({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    },
    [setFormCoordinates]
  )

  useEffect(() => {
    if (isFormDisplayed) {
      setFormCoordinates({
        lat: 0,
        lng: 0
      })
    }
  }, [isFormDisplayed])

  const [selected, setSelected] = React.useState(null)

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10.5}
        center={center}
        options={options}
        onClick={isFormDisplayed ? onMapClick : null}
      >
        {isFormDisplayed ? (
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
        ) : null}

        {data.map(function (marker, index) {
          return (
            <Marker
              key={marker.name}
              position={{lat: parseFloat(marker.coordinates.lat), lng: parseFloat(marker.coordinates.lng)}}
              onMouseOver={() => {
                setSelected(marker)
              }}
            />
          )
        })}

        {selected ? (
          <InfoWindow
            position={{lat: parseFloat(selected.coordinates.lat), lng: parseFloat(selected.coordinates.lng)}}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div style={{ fontWeight: "bold" }}>{selected.name}</div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}
