function initMap() {

  // New map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.035, lng: -114.0603959887364 },
    zoom: 11,
    mapTypeId: "terrain"
  })

  // Marker
 function addMarker(location, gardenName) {

    const marker = new google.maps.Marker({
      position: location,
      title: gardenName,
      map: map,
    // icon: "vegetables.svg" // How to resize?
    })

    const detailWindow = new google.maps.InfoWindow({
      content: marker.title
    })

    marker.addListener("mouseover", () => {
      detailWindow.open(map, marker);
    })

    marker.addListener("mouseout", () => {
      detailWindow.close(map, marker);
    })
  }

addMarker({ lat: 51.12828642120469, lng: -114.17890810185442}, "Hawkwood")
addMarker({ lat: 51.10070132242482, lng: -114.13610715362458}, "Brentwood")
addMarker({ lat: 51.09304721792646, lng: -114.14932508000413}, "Varsity")

}