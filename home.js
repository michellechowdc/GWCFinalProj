function homeInput() {
    var x = document.getElementById('movie-name').value,
        url = 'file:///C:/Users/GWC/Documents/GWC/FinalProject/Moviepg/testFinalProj.html?movie-name=' + x;
        x = x.replace(/ /g, "&");

    document.location.href = url;
}
