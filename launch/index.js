const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('id')) {
    const launchID = urlParams.get('id');
    // document.getElementById('test').innerHTML = launchID;

    $.getJSON(`https://api.spacexdata.com/v5/launches/${launchID}`, function(data) {
        // JSON result in `data` variable
        // console.log(data);
        document.getElementById("patch").src = data.links.patch.large;
        document.getElementById("name").innerText = data.name;
        document.getElementById("date").innerText = data.date_utc;
        document.getElementById("desc").innerText = data.detals;
        document.getElementById("rocket").innerText = data.rocket;
        document.getElementById("yt").innerText = data.links.webcast;
    });
}