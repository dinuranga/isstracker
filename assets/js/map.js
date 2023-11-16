//Making the Maps and Tiles
var Attribute =
    'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
  mapUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFsZWVzaGEzMiIsImEiOiJjbHAwZDRoZDUwOGJhMndvNXV4M21iZ3FlIn0.Z72ihyZZHSwWkCs0gqVTaQ";

var grayscale = L.tileLayer(mapUrl, {
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
    attribution: Attribute,
  }),
  streets = L.tileLayer(mapUrl, {
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: Attribute,
  }),
  satellite = L.tileLayer(mapUrl, {
    id: "mapbox/satellite-streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: Attribute,
  }),
  navigation = L.tileLayer(mapUrl, {
    id: "mapbox/navigation-preview-day-v4",
    tileSize: 512,
    zoomOffset: -1,
    attribution: Attribute,
  });

var map = L.map("map", {
  center: [0, 0],
  zoom: 3,
  layers: [streets],
});

var baseLayers = {
  Streets: streets,
  Grayscale: grayscale,
  Satellite: satellite,
  Navigation: navigation,
};

L.control.layers(baseLayers).addTo(map);

//Make the custom icon and Circle point
const issIcon = L.icon({
  iconUrl: "./asserts/img/iss.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);
const pointer = L.circleMarker([0, 0]).addTo(map);

//API URLS
const iss_api_url = "http://api.open-notify.org/iss-now.json";
const crew_api_url = "http://api.open-notify.org/astros.json";

//Polyline
var polyline = L.polyline([], { color: "red" }).addTo(map);

//Get Data from ISS API and Show
async function getISS() {
  const response = await fetch(iss_api_url);
  const data = await response.json();

  var latitude = data["iss_position"]["latitude"];
  var longitude = data["iss_position"]["longitude"];
  marker.setLatLng([latitude, longitude]);
  pointer.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude]);
  polyline.addLatLng([latitude, longitude]);

  // console.log(latitude);
  // console.log(longitude);
}

getISS();
setInterval(getISS, 500);
