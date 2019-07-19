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

function newInput() {
    var x = document.getElementById('movie-name').value,
        url = 'file:///C:/Users/GWC/Documents/GWC/FinalProject/Moviepg/testFinalProj.html?movie-name=' + x;
        x = x.replace(/ /g, "&");

    document.location.href = url;
}

// Get and display movie info
function makeMovieRequest() {
var url = document.location.href
url = url.split("=").pop();

var movieName = url
if (movieName === "") {
  alert("You didn't enter a movie name!");
  return;
}

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
document.getElementById("showTitle").classList.remove("hide");

// var listGenres = movieInfo.genres[0];
// for (i = 0; i < listGenres.length; i++)
//   document.getElementById("showGenre").innerHTML += movieInfo.genres[i];

document.getElementById("showInfo").innerHTML = "Rated: " + movieInfo.rated + ", " + movieInfo.runtime + ", " + "Released: " + movieInfo.year;
document.getElementById("showPoster").src = movieInfo.urlPoster;
document.getElementById("showPoster").classList.remove("hide");

document.getElementById("showSummary").innerHTML = movieInfo.simplePlot;

// ftydrseazdxfcghbjk
document.getElementById("showTrailer").src = movieInfo.trailer.qualities[0].videoURL;
document.getElementById("showTrailer").classList.remove("hide");
// if (movieInfo.filmingLocations[0].location === "") { document.getElementById("showLocation").innerHTML = "No location found";
// } else {
document.getElementById("showLocation").innerHTML = movieInfo.filmingLocations[0].location;
// }

openMap();
}


// get map
function openMap() {
var movieAddress = document.getElementById("showLocation").innerHTML;
var movieName = document.getElementById("showTitle").innerHTML;

if (movieAddress === "q") {
  document.getElementById("googleMap").innerHTML = "Map Unavailable";
} else {

  var movieLocName = movieAddress
  movieLocName = movieLocName.split(" - ")[0];
  document.getElementById("trailerText").innerHTML = "Visit " + movieLocName + ", the filming location of this movie, if you liked watching " + movieName + "!";

  movieAddress = movieAddress.replace(/ - /g, ",");
  movieAddress = movieAddress.replace(/, /g, ",");
  movieAddress = movieAddress.replace(/ /g, "+");

document.getElementById("googleMap").src = "https://www.google.com/maps/embed/v1/place?q=" + movieAddress +  "&key=AIzaSyCHVB2GQRul-sTvAW8vzB0RFjJ5J7-90hY";
  }
}
