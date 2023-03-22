// make an HTTP GET request using jQuery
$.get('https://api.spacexdata.com/v5/launches/latest', function(data) {
  // extract the "time-udc" value from the response JSON
  const timeUdc = data['time-udc'];
    console.log(timeUdc);

  // set the "time-udc" value as the innerHTML of the <p> tag with id "time-to-launch"
  $('#time-to-launch').html(timeUdc);
});

