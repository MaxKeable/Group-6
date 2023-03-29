// NASA daily image
var nasaKey = "Vs5yP6tMYxLhzzevSdf3FfQgHLaYKExehOojOtFT";
// make NASA daily media specific to images only
var nasaUrl =
  "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey + "&thumbs=True";
var dailyImg = document.getElementById("nasa-img");
var rocketName = $("#rocket-name");
var locationName = $("#location");
var launchDescription = $("#launch-description");
var missionName = $("#mission-name");
var padName = $("#launch-pad-name");
var temperature = $("#temperature");
var weatherCondition = $("#weather-condition");
var windSpeed = $("#wind-speed");
var providerName = $("#provider-name");
var futureLaunchButton = $("#future-launch");
var futureMissionLocation = $("#future-mission-location");
var futureMissionName = $("#future-mission-name");
var futureRocketName = $("#future-rocket-name");
var futureLaunchPad = $("#future-launch-pad");
var futureLaunchTime = $("#future-launch-time");
var count = 1;

const dataUrl = "https://fdo.rocketlaunch.live/json/launches/next/5";

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
      if (data.thumbnail_url) {
        dailyImg.src = data.thumbnail_url;
      } else {
        dailyImg.src = data.url;
      }
    });
}
// // make an HTTP GET request using jQuery
// $.get("https://api.spacexdata.com/v5/launches/latest", function (data) {
//   // extract the "time-udc" value from the response JSON
//   const timeUdc = data["time-udc"];
//   console.log(timeUdc);

//   // set the "time-udc" value as the innerHTML of the <p> tag with id "time-to-launch"
//   $("#time-to-launch").html(timeUdc);
// });

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

function nextLaunchData() {
  fetch(dataUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayNextLaunch(data, count);
        });
      } else {
        alert("Error." + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });

  //Show the div and change css
  $("#launch-div").css("display", "block");

  $("#future-launch-button").css("background-color", "#20262e");
}
//Display Data on the Dashboard

function displayData(data) {
  var dailyResult = data.result[0];

  //Current launch Information
  //checking if value is null
  if (dailyResult.vehicle.name === null) {
    rocketName.text("Data not returned");
  } else {
    rocketName.text(dailyResult.vehicle.name);
  }
  if (dailyResult.pad.location.country === null) {
    locationName.text("Data not returned");
  } else {
    locationName.text(dailyResult.pad.location.country);
  }
  if (dailyResult.pad.location.name === null) {
    padName.text("Data not returned");
  } else {
    padName.text(dailyResult.pad.location.name);
  }
  if (dailyResult.missions[0].name === null) {
    missionName.text("Data not returned");
  } else {
    missionName.text(dailyResult.missions[0].name);
  }
  if (dailyResult.provider.name === null) {
    providerName.text("Data not returned");
  } else {
    providerName.text(dailyResult.provider.name);
  }

  // if next rocket launch time is not available, timer context will display "Data not returned"
  if (dailyResult.win_open == null) {
    timer.text("Data not returned");
  } else {
    let launchTime = new Date(dailyResult.win_open);
    setInterval(function () {
      timeBetweenDates(launchTime);
    }, 1000);
  }

  //Weather Information
  if (dailyResult.weather_temp === null) {
    temperature.text("Data not returned");
  } else {
    temperature.text(dailyResult.weather_temp);
  }
  if (dailyResult.weather_condition === null) {
    weatherCondition.text("Data not returned");
  } else {
    weatherCondition.text(dailyResult.weather_condition);
  }
  if (dailyResult.weather_wind_mph === null) {
    windSpeed.text("Data not returned");
  } else {
    windSpeed.text(`${dailyResult.weather_wind_mph} mph`);
  }

  launchDescription.text(
    `Launch Description : ${dailyResult.launch_description}`
  );
}

//Next Launches passing the index number

function displayNextLaunch(data, indexNumber) {
  var resultArray = data.result[indexNumber];

  // Storing in  variables
  var locationCountry = resultArray.pad.location.country;
  if (locationCountry === null) {
    futureMissionLocation.text("Data not returned");
  } else {
    futureMissionLocation.text(locationCountry);
  }

  var missionName = resultArray.missions[0].name;
  if (missionName === null) {
    futureMissionName.text("Data not returned");
  } else {
    futureMissionName.text(missionName);
  }

  var vechicleName = resultArray.vehicle.name;
  if (vechicleName === null) {
    futureRocketName.text("Data not returned");
  } else {
    futureRocketName.text(vechicleName);
  }

  var padName = resultArray.pad.location.name;
  if (padName === null) {
    futureLaunchPad.text("Data not returned");
  } else {
    futureLaunchPad.text(padName);
  }

  var dateTime = resultArray.t0;
  if (dateTime === null) {
    futureLaunchTime.text("Data not returned");
  } else {
    futureLaunchTime.text(dateTime);
  }

  //Create an object to stringify and in the local storage
  var nextLaunchInfo = {
    missionLocation: locationCountry,
    rocketName: vechicleName,
    launchPadName: padName,
    nextMissionName: missionName,
    launchTime: dateTime,
  };

  localStorage.setItem("nextLaunchInfo", JSON.stringify(nextLaunchInfo));
}

//Click event triggered by next launch button
futureLaunchButton.on("click", nextLaunchData);

// countdown timer between next launch time and current time
function timeBetweenDates(launchTime) {
  // create a new Date object with the current date and time
  let currentDate = new Date();
  var difference = launchTime - currentDate;
  if (difference <= 0) {
    clearInterval(timer);
  } else {
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    $("#days").text(days);
    $("#hours").text(hours);
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);
  }
}
getNasaImg();

//Showing saved launches in the modal(from localStorage)

$("#saved-launch").on("click", savedData);
$("#close").on("click", function () {
  $("#modal").css("display", "none");
});

//Display local storage values in the modal
function savedData() {
  // Display modal
  $("#modal").attr("class", "is-active");
  var savedInfo = JSON.parse(localStorage.getItem("nextLaunchInfo"));
  if (savedInfo === null) {
    $("#saved-mission-location").text("Location :No saved data");
    $("#saved-mission-name").text("Mission Name :No saved data");
    $("#saved-rocket-name").text("Rocket Name : No saved data");
    $("#saved-launch-pad").text("Launch Pad Name : No saved data");
    $("#saved-launch-time").text("Launch Time : No saved data");
  } else {
    $("#saved-mission-location").text(
      `Location : ${savedInfo.missionLocation}`
    );
    $("#saved-mission-name").text(
      `Mission Name : ${savedInfo.nextMissionName}`
    );
    $("#saved-rocket-name").text(`Rocket Name : ${savedInfo.rocketName}`);
    $("#saved-launch-pad").text(`Launch Pad Name : ${savedInfo.launchPadName}`);
    $("#saved-launch-time").text(`Launch Time : ${savedInfo.launchTime}`);
  }
}

const rocketLaunchSites = [
  {
    name: "Baikonur Cosmodrome",
    location: "Kazakhstan",
    latitude: 45.6,
    longitude: 63.3,
  },
  {
    name: "Kennedy Space Center",
    location: "Florida, USA",
    latitude: 28.5,
    longitude: -80.6,
  },
  {
    name: "Vandenberg Air Force Base",
    location: "California, USA",
    latitude: 34.7,
    longitude: -120.5,
  },
  {
    name: "Jiuquan Satellite Launch Center",
    location: "China",
    latitude: 40.9,
    longitude: 100.3,
  },
  {
    name: "Tanegashima Space Center",
    location: "Japan",
    latitude: 30.4,
    longitude: 130.9,
  },
  {
    name: "Guiana Space Centre",
    location: "French Guiana",
    latitude: 5.2,
    longitude: -52.8,
  },
  {
    name: "Satish Dhawan Space Centre",
    location: "India",
    latitude: 13.7,
    longitude: 80.2,
  },
  {
    name: "Plesetsk Cosmodrome",
    location: "Russia",
    latitude: 62.9,
    longitude: 40.3,
  },
  {
    name: "Wallops Flight Facility",
    location: "Virginia, USA",
    latitude: 37.9,
    longitude: -75.5,
  },
  {
    name: "Xichang Satellite Launch Center",
    location: "China",
    latitude: 28.2,
    longitude: 102.0,
  },
  {
    name: "Svobodny Cosmodrome",
    location: "Russia",
    latitude: 51.4,
    longitude: 128.1,
  },
  {
    name: "Alcântara Launch Center",
    location: "Brazil",
    latitude: -2.3,
    longitude: -44.4,
  },
  {
    name: "Semnan Space Center",
    location: "Iran",
    latitude: 35.2,
    longitude: 53.9,
  },
  {
    name: "Taiyuan Satellite Launch Center",
    location: "China",
    latitude: 37.1,
    longitude: 111.0,
  },
  {
    name: "Kourou ELV",
    location: "French Guiana",
    latitude: 5.2,
    longitude: -52.8,
  },
  {
    name: "Alcantara Launch Site",
    location: "Brazil",
    latitude: -2.3,
    longitude: -44.4,
  },
  {
    name: "Andøya Space Center",
    location: "Norway",
    latitude: 69.3,
    longitude: 16.0,
  },
  {
    name: "Svalbard Rocket Range",
    location: "Norway",
    latitude: 78.3,
    longitude: 15.5,
  },
  {
    name: "North Korean Space Launch Facility",
    location: "North Korea",
    latitude: 39.0675,
    longitude: 125.7403,
  },
  {
    name: "Wenchang Spacecraft Launch Site",
    location: "China",
    latitude: 19.5243,
    longitude: 110.9308,
  },
  {
    name: "Blue Origin West Texas Launch Site",
    location: "Texas, USA",
    latitude: 32.0708,
    longitude: -104.7475,
  },
  {
    name: "Vostochny Cosmodrome",
    location: "Russia",
    latitude: 51.87,
    longitude: 128.3317,
  },
  {
    name: "Pacific Spaceport Complex - Alaska",
    location: "Alaska, USA",
    latitude: 57.47,
    longitude: -152.35,
  },
  {
    name: "Cape Canaveral Space Force Station",
    location: "Florida, USA",
    latitude: 28.4906,
    longitude: -80.5242,
  },
];

// Convert the array to the format expected by Globe.gl
const gData = rocketLaunchSites.map((site) => ({
  lat: site.latitude,
  lng: site.longitude,
  str: site.name,
  size: Math.random() / 3,
  color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
}));

// Create the globe visualization
Globe()
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
  .pointsData(gData)
  .pointAltitude("size")
  .pointColor("color")
  .pointLabel("str")(document.getElementById("globe"));
