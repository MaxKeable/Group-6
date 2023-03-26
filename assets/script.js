// NASA daily image
var nasaKey = "Vs5yP6tMYxLhzzevSdf3FfQgHLaYKExehOojOtFT";
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey;
var dailyImg = document.getElementById("nasa-img");

// Navbar burger responsive on smaller screens
var burger = $('#burger');
var menu = $('#nav-links');
burger.on('click', function (event) {
  event.preventDefault();
  menu.toggleClass('is-active');
});

var rocketName = $("#rocket-name");
var locationName = $("#location");
var launchDescription = $("#launch-description");

var dataUrl = "https://fdo.rocketlaunch.live/json/launches/next/5";


// Fetch daily NASA image
function getNasaImg() {
  fetch(nasaUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Set the source of the image element to the image URL.
      dailyImg.src = data.url;
    });
}

getNasaImg();

// make an HTTP GET request using jQuery
$.get("https://api.spacexdata.com/v5/launches/latest", function (data) {
  // extract the "time-udc" value from the response JSON
  const timeUdc = data["time-udc"];
  console.log(timeUdc);

  // set the "time-udc" value as the innerHTML of the <p> tag with id "time-to-launch"
  $("#time-to-launch").html(timeUdc);
});

//Fetch data from API

fetch(dataUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayData(data);
      });
    } else {
      alert("Error." + response.statusText);
    }
  })
  .catch(function (error) {
    alert("Unable to connect to API");
  });

//Display Data on the Dashboard

function displayData(data) {
  var dailyResult = data.result[0];
  //checking if value is null
  if (dailyResult.vehicle.name === null) {
    rocketName.text("Data not returned");
  }
  if (dailyResult.pad.location.country === null) {
    locationName.text("Data not returned");
  }
<<<<<<< Updated upstream
  rocketName.text(`Name of the Rocket : ${dailyResult.vehicle.name}`);
  locationName.text(`Country : ${dailyResult.pad.location.country}`);
=======

  //Mission Information
  locationName.text(`${dailyResult.pad.location.country}`);
  rocketName.text(`${dailyResult.vehicle.name}`);
  padName.text(`${dailyResult.pad.location.name}`);
  missionName.text(`${dailyResult.missions[0].name}`);

  //Weather Information
  temperature.text(`${dailyResult.weather_temp}`);
  weatherCondition.text(`${dailyResult.weather_condition}`);
  windSpeed.text(`${dailyResult.weather_wind_mph} mph`);

>>>>>>> Stashed changes
  launchDescription.text(
    `Launch Description : ${dailyResult.launch_description}`
  );
}

// make a helper function that displays items
// N1 if any of those items are null, display custom message
// N2 if any of those items are null, refetch
// first function could check if any of the fields are null, if not, execute the next functions
// --> populate the data in html



// Just commented this out as its not working yet :)
// function make-globe(){
//      size: Math.random() / 3,
//     Globe()
//       .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
//       .pointAltitude('size')
//       .pointColor('color')
//     (document.getElementById('globe'))
// }

// make-globe();
