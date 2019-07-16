// function onClientLoad() {
//     gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
// }
//
// function onYouTubeApiLoad() {
//     gapi.client.setApiKey('AIzaSyAockgrHGPhMly9fx7v9vSyWvpeRhygb5o');
// }



function makeMovieRequest() {
var movieName = document.getElementById("movie-name").value;

  if (movieName === "") {
    alert("You didn't enter a movie name!");
    return;
  }

var query =
  "http://www.omdbapi.com/?i=tt3896198&apikey=aa61b30a&t=" + movieName;

query = query.replace(/ /g, "+");

request = new XMLHttpRequest();
request.open("GET", query, true);
request.onload = processData;
request.onload = keyWordsearch;
request.send();
}


function processData() {
// get all movie data
var movieTitle = JSON.parse(request.responseText);

// movie title
document.getElementById("showTitle").innerHTML = movieTitle.Title;
// movie genre
document.getElementById("showGenre").innerHTML = movieTitle.Genre;
// rating, runtime, release
document.getElementById("showInfo").innerHTML = "Rated: " + movieTitle.Rated + ", " + movieTitle.Runtime + ", " + "Released: " + movieTitle.Year;
// movie poster
document.getElementById("showPoster").src = movieTitle.Poster;
// movie summary
document.getElementById("showSummary").innerHTML = movieTitle.Plot;

// movie trailer
// const movieTrailer = require('movie-trailer');
// var trailerURL = movieTrailer(movieName).then(console.log)
// document.getElementById("showTrailer").src = trailerURL;
}

// var movieTrailer = "https://www.youtube.com/embed/" + trailerID;

// YT data api code
// AIzaSyAockgrHGPhMly9fx7v9vSyWvpeRhygb5o

// function search() {
//     var request = gapi.client.youtube.search.list({
//         part: 'snippet',
//         q:movieName
//     });
//     request.execute(onSearchResponse);
// }
//
// function onSearchResponse(response) {
// // function onSearchResponse(response) {
//     var responseString = JSON.stringify(response, '', 2);
//     document.getElementById('showTrailer').src = responseString;
// }



function keyWordsearch(){
        gapi.client.setApiKey('AIzaSyAockgrHGPhMly9fx7v9vSyWvpeRhygb5o');
        gapi.client.load('youtube', 'v3', function() {
                makeRequest();
        });
}
    function makeRequest() {
        var q = $('#movie-name').val();
        // var q = "Finding Nemo
        var request = gapi.client.youtube.search.list({
                q: q,
                part: 'snippet',
                maxResults: 10
        });
        request.execute(function(response)  {
                // $('#results').empty()
                var srchItems = response.result.items;
                $.each(srchItems, function(index, item) {
                // vidTitle = item.snippet.title;
                // vidThumburl =  item.snippet.thumbnails.default.url;
                vidID = item.id.videoId
                // vidThumbimg = '<pre><img id="thumb" src="'+vidThumburl+'" alt="No  Image Available." style="width:204px;height:128px"></pre>';

                $('#showTrailer').src=("https://www.youtube.com/embed/" + vidID);
        })
    })
}
