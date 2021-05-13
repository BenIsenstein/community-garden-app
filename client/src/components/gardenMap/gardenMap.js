function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.035, lng: -114.0603959887364 },
    zoom: 11,
    mapTypeId: "terrain",
    mapId: '52ff285bd1833867'
  })

 function addMarker(coordinates, gardenName) {

    const marker = new google.maps.Marker({
      position: property.location,
      title: property.title,
      map: map,
    // icon: "vegetables.svg" // How to resize?
    })

    const detailWindow = new google.maps.InfoWindow({
      content: marker.title
    })
    marker.addListener("mouseover", () => {
      detailWindow.open(map, marker)
    })
    marker.addListener("mouseout", () => {
      detailWindow.close(map, marker)
    })
  }

let markerArray = [
  [{location:{ lat: 51.12828642120469, lng: -114.17890810185442}, title:"Hawkwood"}],
  [{location:{ lat: 51.10070132242482, lng: -114.13610715362458}, title:"Brentwood"}],
  [{location:{ lat: 51.09304721792646, lng: -114.14932508000413}, title:"Varsity"}]
]

for (let i = 0; i < markerArray.length; i++) {
  addMarker(markerArray[i])
}
}