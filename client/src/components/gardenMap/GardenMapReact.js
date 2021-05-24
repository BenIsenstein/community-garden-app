import React, { useEffect } from "react"
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
        zoom={11}
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

        {markerArray.map(function (marker, index) {
          return (
            <Marker
              key={marker.title}
              position={marker.location}
              onMouseOver={() => {
                setSelected(marker)
              }}
            />
          )
        })}

        {selected ? (
          <InfoWindow
            position={selected.location}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div style={{ fontWeight: "bold" }}>{selected.title}</div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}
