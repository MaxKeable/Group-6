// NASA daily image
var nasaKey = "Vs5yP6tMYxLhzzevSdf3FfQgHLaYKExehOojOtFT";
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=" + nasaKey;
var dailyImg = document.getElementById("nasa-img");

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

function make-globe(){
     size: Math.random() / 3,
    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointAltitude('size')
      .pointColor('color')
    (document.getElementById('globe'))
}

make-globe();
