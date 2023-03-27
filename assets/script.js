// NASA daily image
var nasaKey = "Vs5yP6tMYxLhzzevSdf3FfQgHLaYKExehOojOtFT";
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey;
var dailyImg = document.getElementById("nasa-img");
var rocketName = $("#rocket-name");
var locationName = $("#location");
var launchDescription = $("#launch-description");
var missionName = $("#mission-name");
var padName = $("#launch-pad-name");
var temperature = $("#temperature");
var weatherCondition = $("#weather-condition");
var windSpeed = $("#wind-speed");

var dataUrl = "https://fdo.rocketlaunch.live/json/launches/next/5";

// Navbar burger responsive on smaller screens
var burger = $("#burger");
var menu = $("#nav-links");
burger.on("click", function (event) {
  event.preventDefault();
  menu.toggleClass("is-active");
});

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

  locationName.text(`${dailyResult.pad.location.country}`);
  rocketName.text(`${dailyResult.vehicle.name}`);
  padName.text(`${dailyResult.pad.location.name}`);
  missionName.text(`${dailyResult.missions[0].name}`);


  //Weather Information
  temperature.text(`${dailyResult.weather_temp}`);
  weatherCondition.text(`${dailyResult.weather_condition}`);
  windSpeed.text(`${dailyResult.weather_wind_mph} mph`);


  launchDescription.text(
    `Launch Description : ${dailyResult.launch_description}`
  );
}

// make a helper function that displays items
// N1 if any of those items are null, display custom message
// N2 if any of those items are null, refetch
// first function could check if any of the fields are null, if not, execute the next functions
// --> populate the data in html

    const rocketLaunchSites = [
      {
        "name": "Baikonur Cosmodrome",
        "location": "Kazakhstan",
        "latitude": 45.6,
        "longitude": 63.3
      },
      {
        "name": "Kennedy Space Center",
        "location": "Florida, USA",
        "latitude": 28.5,
        "longitude": -80.6
      },
      {
        "name": "Vandenberg Air Force Base",
        "location": "California, USA",
        "latitude": 34.7,
        "longitude": -120.5
      },
      {
        "name": "Jiuquan Satellite Launch Center",
        "location": "China",
        "latitude": 40.9,
        "longitude": 100.3
      },
      {
        "name": "Tanegashima Space Center",
        "location": "Japan",
        "latitude": 30.4,
        "longitude": 130.9
      },
      {
        "name": "Guiana Space Centre",
        "location": "French Guiana",
        "latitude": 5.2,
        "longitude": -52.8
      },
      {
        "name": "Satish Dhawan Space Centre",
        "location": "India",
        "latitude": 13.7,
        "longitude": 80.2
      },
      {
        "name": "Plesetsk Cosmodrome",
        "location": "Russia",
        "latitude": 62.9,
        "longitude": 40.3
      },
      {
        "name": "Wallops Flight Facility",
        "location": "Virginia, USA",
        "latitude": 37.9,
        "longitude": -75.5
      },
      {
        "name": "Xichang Satellite Launch Center",
        "location": "China",
        "latitude": 28.2,
        "longitude": 102.0
      },
      {
        "name": "Svobodny Cosmodrome",
        "location": "Russia",
        "latitude": 51.4,
        "longitude": 128.1
      },
      {
        "name": "Alcântara Launch Center",
        "location": "Brazil",
        "latitude": -2.3,
        "longitude": -44.4
      },
      {
        "name": "Semnan Space Center",
        "location": "Iran",
        "latitude": 35.2,
        "longitude": 53.9
      },
      {
        "name": "Taiyuan Satellite Launch Center",
        "location": "China",
        "latitude": 37.1,
        "longitude": 111.0
      },
      {
        "name": "Kourou ELV",
        "location": "French Guiana",
        "latitude": 5.2,
        "longitude": -52.8
      },
      {
    "name": "Alcantara Launch Site",
    "location": "Brazil",
    "latitude": -2.3,
    "longitude": -44.4
      },
      {
        "name": "Andøya Space Center",
        "location": "Norway",
        "latitude": 69.3,
        "longitude": 16.0
      },
      {
        "name": "Svalbard Rocket Range",
        "location": "Norway",
        "latitude": 78.3,
        "longitude": 15.5
      },
      {
      "name": "North Korean Space Launch Facility",
      "location": "North Korea",
      "latitude": 39.0675,
      "longitude": 125.7403
      },
      {
        "name": "Wenchang Spacecraft Launch Site",
        "location": "China",
        "latitude": 19.5243,
        "longitude": 110.9308
      },
      {
        "name": "Blue Origin West Texas Launch Site",
        "location": "Texas, USA",
        "latitude": 32.0708,
        "longitude": -104.7475
      },
      {
        "name": "Vostochny Cosmodrome",
        "location": "Russia",
        "latitude": 51.87,
        "longitude": 128.3317
      },
      {
        "name": "Pacific Spaceport Complex - Alaska",
        "location": "Alaska, USA",
        "latitude": 57.47,
        "longitude": -152.35
      },
      {
        "name": "Cape Canaveral Space Force Station",
        "location": "Florida, USA",
        "latitude": 28.4906,
        "longitude": -80.5242
      }
  
      ];

    // Convert the array to the format expected by Globe.gl
    const gData = rocketLaunchSites.map(site => ({
      lat: site.latitude,
      lng: site.longitude,
      str: site.name,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    }));

    // Create the globe visualization
    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color')
      .pointLabel('str')
      (document.getElementById('globe'))
