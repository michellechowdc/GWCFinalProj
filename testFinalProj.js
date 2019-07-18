// chrome.runtime.onInstalled.addListener(function() {
//   chrome.contextMenus.create({
//     "id": "sampleContextMenu",
//     "title": "Sample Context Menu",
//     "contexts": ["selection"]
//   });
// });

// function searchMovieAPI()
// {
//  makeMovieRequest();
//  chrome.tabs.create({url:   "https://www.myapifilms.com/imdb/idIMDB?title=" + movieName + "&token=b195f179-9b26-43b2-9d5d-862f50c35050&format=json&language=en-us&trailers=1&filmingLocations=1"})
//  searchMovieAPI();
// }
//
// chrome.contextMenus.create({title: "Search Movie API", contexts:["selection"], onclick: searchMovieAPI});


//
// // Get and display movie info
function makeMovieRequest() {
var movieName = document.getElementById("movie-name").value;

if (movieName === "") {
  alert("You didn't enter a movie name!");
  return;
}

// HERE
movieName = "Finding Nemo"
var query =
  "https://www.myapifilms.com/imdb/idIMDB?title=" + movieName + "&token=b195f179-9b26-43b2-9d5d-862f50c35050&format=json&language=en-us&trailers=1&filmingLocations=1"
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

// document.getElementById("showTrailer").setAttribute = "hidden";
// document.getElementById("showTrailer").classList.replace(hide, show);
document.getElementById("showTrailer").src = movieInfo.trailer.qualities[0].videoURL;

// if (movieInfo.filmingLocations[0].location === "") { document.getElementById("showLocation").innerHTML = "No location found";
// } else {
document.getElementById("showLocation").innerHTML = movieInfo.filmingLocations[0].location;
// }

// document.getElementById("movie-name").setAttribute("", "hide");
// document.getElementById("movieButton").setAttribute("", "hide");
openMap();
}




// get map coordinates
function openMap() {
var movieAddress = document.getElementById("showLocation").innerHTML;

if (movieAddress === "q") {
  document.getElementById("googleMap").innerHTML = "Map Unavailable";
} else {
  // movieAddress = movieAddress.split("- ").pop();

  // var addQuery =
  //   "https://www.mapquestapi.com/geocoding/v1/address?key=SJ4ZCUYnAgW7cXTqRSonL65wis7pNme7&inFormat=kvp&outFormat=json&location=" + movieAddress + "&thumbMaps=false"

  // addQuery = addQuery.replace(/ /g, "+");
  // addQuery = addQuery.replace(/, /g, "%2C");
  movieAddress = movieAddress.replace(/ - /g, ",");
  movieAddress = movieAddress.replace(/, /g, ",");
  movieAddress = movieAddress.replace(/ /g, "+");
  // document.getElementById("showCords").innerHTML = movieAddress;

document.getElementById("googleMap").src = "https://www.google.com/maps/embed/v1/place?q=" + movieAddress +  "&key=AIzaSyCHVB2GQRul-sTvAW8vzB0RFjJ5J7-90hY";

  // request = new XMLHttpRequest();
  // request.open("GET", addQuery, true);
  // request.onload = processCoords;
  // request.send();
  }
}
//
// function processCoords() {
// var mapData = JSON.parse(request.responseText);
// var addCords = mapData.results[0].locations[0].latLng;
//
// var addLat = addCords.lat;
// var addLng = addCords.lng;
//
// // document.getElementById("showCords").innerHTML = addLat + ", " + addLng;
// // document.getElementById("googleMap").src = "https://www.google.com/maps/embed/v1/place?q=" + "locationName" + "&center=" + addLat + "+" + addLng + "&zoom=17&key=AIzaSyCHVB2GQRul-sTvAW8vzB0RFjJ5J7-90hY";
// }
