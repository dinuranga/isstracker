const iss_api_url = "http://api.open-notify.org/iss-now.json";
const crew_api_url = "http://api.open-notify.org/astros.json";
const whereis_api_url = "https://api.wheretheiss.at/v1/satellites/25544";

//Get Data from ISS API and Show
async function getISS() {
  const response = await fetch(iss_api_url);
  const data = await response.json();
  var timestamp = data["timestamp"];

  let unix_timestamp = timestamp;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  }
  document.getElementById("time").innerHTML = formatAMPM(new Date());

  var latitude = data["iss_position"]["latitude"];
  var longitude = data["iss_position"]["longitude"];

  document.getElementById("lat").innerHTML = latitude;
  document.getElementById("long").innerHTML = longitude;
  document.getElementById("latData").innerHTML = latitude + "° N";
  document.getElementById("longData").innerHTML = longitude + "°E";

  console.log(latitude);
}

//Get Altitude and Velocity
async function getAltitudeAndVelocity() {
  const response = await fetch(whereis_api_url);
  const data = await response.json();

  var altitude = data["altitude"].toFixed(2);
  var velocity = data["velocity"].toFixed(2);
  document.getElementById("altitude").innerHTML = altitude + "Km";
  document.getElementById("velocity").innerHTML = velocity + "Km/h";
}

//Retrive Crew Members Details from ASTRONUANTS API
async function getCrewData() {
  const response = await fetch(crew_api_url);
  const data = await response.json();
  var crew = "";
  for (i = 0; i < data.number; i++) {
    crew =
      "<tr><td>" +
      data.people[i].name +
      "</td>" +
      "<td>" +
      data.people[i].craft +
      "</td></tr>" +
      crew;
    document.getElementById("crew").innerHTML =
      "<th>Name</th><th>Craft</th>" + crew;
  }
}
getISS();
getCrewData();
getAltitudeAndVelocity();

setInterval(getISS, 500);
setInterval(getAltitudeAndVelocity, 1000);
