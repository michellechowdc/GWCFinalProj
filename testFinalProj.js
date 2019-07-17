// Get and display movie info
function makeMovieRequest() {
var movieName = document.getElementById("movie-name").value;

if (movieName === "") {
  alert("You didn't enter a movie name!");
  return;
}

var query =
  "https:/www.myapifilms.com/imdb/idIMDB?title=" + movieName + "&token=b195f179-9b26-43b2-9d5d-862f50c35050&format=json&language=en-us&trailers=1&filmingLocations=1"
query = query.replace(/ /g, "+");

request = new XMLHttpRequest();
request.open("GET", query, true);
request.onload = processMovieData;
// request.onload = openMap;
request.send();
}

function processMovieData() {
var movieTitle = JSON.parse(request.responseText);
var movieInfo = movieTitle.data.movies[0];

document.getElementById("showTitle").innerHTML = movieInfo.title;

// var listGenres = movieInfo.genres[0];
// for (i = 0; i < listGenres.length; i++)
//   document.getElementById("showGenre").innerHTML += movieInfo.genres[i];

document.getElementById("showInfo").innerHTML = "Rated: " + movieInfo.rated + ", " + movieInfo.runtime + ", " + "Released: " + movieInfo.year;
document.getElementById("showPoster").src = movieInfo.urlPoster;

document.getElementById("showSummary").innerHTML = movieInfo.simplePlot;

// document.getElementById("showTrailer").className = "show";
document.getElementById("showTrailer").src = movieInfo.trailer.qualities[0].videoURL;

if (movieInfo.filmingLocations[0].location === "") { document.getElementById("showLocation").innerHTML = "No location found";
} else {
document.getElementById("showLocation").innerHTML = movieInfo.filmingLocations[0].location;
}

openCordData();
}




// get map coordinates
function openCordData() {
var movieAddress = document.getElementById("showLocation").innerHTML;

if (movieAddress === "No location found") {
// show error on map
document.getElementById("showCords").innerHTML = "Map Unavailable";
} else {
// need to delete name of location first
movieAddress = movieAddress.split("- ").pop();

var addQuery =
  "https://www.mapquestapi.com/geocoding/v1/address?key=SJ4ZCUYnAgW7cXTqRSonL65wis7pNme7&inFormat=kvp&outFormat=json&location=" + movieAddress + "&thumbMaps=false"

addQuery = addQuery.replace(/ /g, "+");
addQuery = addQuery.replace(/, /g, "%2C");

request = new XMLHttpRequest();
request.open("GET", addQuery, true);
request.onload = processCoords;
request.send();
}
}

function processCoords() {
var mapData = JSON.parse(request.responseText);
var addCords = mapData.results[0].locations[0].latLng;

var addLat = addCords.lat;
var addLng = addCords.lng;

// document.getElementById("showCords").innerHTML = addLat + ", " + addLng;

// L.mapquest.key = 'SJ4ZCUYnAgW7cXTqRSonL65wis7pNme7';
//
// var map = L.mapquest.map('map', {
//   center: [addLat, addLng],
//   layers: L.mapquest.tileLayer('map'),
//   zoom: 12
// });
//
// map.addControl(L.mapquest.control());


var mymap = L.map('map').setView([addLat, addLng], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'SJ4ZCUYnAgW7cXTqRSonL65wis7pNme7'
}).addTo(mymap);

}



// make map
function openMap() {
        // L.mapquest.key = 'SJ4ZCUYnAgW7cXTqRSonL65wis7pNme7';
        //
        // var map = L.mapquest.map('map', {
        //   center: [addLat, addLng],
        //   layers: L.mapquest.tileLayer('map'),
        //   zoom: 12
        // });
        //
        // map.addControl(L.mapquest.control());
      }
