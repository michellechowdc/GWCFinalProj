function homeInput() {
    var x = document.getElementById('movie-name').value,
        url = 'file:///C:/Users/GWC/Documents/GWC/FinalProject/Moviepg/moviePg.html?movie-name=' + x;
        x = x.replace(/ /g, "&");

    document.location.href = url;
}

function openHome() {
  document.location.href = "file:///C:/Users/GWC/Documents/GWC/FinalProject/Homepg/home.html";
}
function openMovies() {
  document.location.href = "file:///C:/Users/GWC/Documents/GWC/FinalProject/Homepg/home.html#page-Movies";
}
// BOTH GO HOME
function openReviews() {
  document.location.href = "file:///C:/Users/GWC/Documents/GWC/FinalProject/Reviewpg/review.html";
}
function openAbout() {
  document.location.href = "file:///C:/Users/GWC/Documents/GWC/FinalProject/Aboutpg/about.html";
}
