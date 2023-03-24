// NASA daily image
var nasaKey = "Vs5yP6tMYxLhzzevSdf3FfQgHLaYKExehOojOtFT";
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey;
var dailyImg = document.getElementById("nasa-img");


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

fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayData(data);
  });

//Display Data in the Dashboard

function displayData(data) {
  // if (data.result[0].t0 === null) {
  //timeToLaunch.textContent = `Time : ${data.result[0].date_str}`;

  rocketName.text(`Name of the Rocket : ${data.result[0].vehicle.name}`);
  locationName.text(`Country : ${data.result[0].pad.location.country}`);
  launchDescription.text(
    `Launch Description : ${data.result[0].launch_description}`
  );
}

// make a helper function that displays items
// N1 if any of those items are null, display custom message
// N2 if any of those items are null, refetch
// first function could check if any of the fields are null, if not, execute the next functions
// --> populate the data in html
