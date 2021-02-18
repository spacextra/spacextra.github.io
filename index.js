var request = new XMLHttpRequest()
const app = document.getElementById('launchTableBody')

var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var launchDate = "";
var launchName = "";
// const container = document.createElement('div')
// container.setAttribute('class', 'container')

// app.appendChild(container)

function getData() {
    $('#launchTableBody').empty();
    request.open('GET', 'https://api.spacexdata.com/v4/launches/upcoming', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            data.forEach((launch) => {
                console.log(launch.name);
                var date = moment(launch.date_utc).format("dddd, MMMM Do YYYY @ HH:mm:ss")

                var row = app.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                // const card = document.createElement('div')
                // card.setAttribute('class', 'card')

                // const h1 = document.createElement('h1')
                // h1.textContent = launch.name

                // const h2 = document.createElement('h2')
                // h2.textContent = convdataTime

                // const p = document.createElement('p')

                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    if (launch.details != null){
                        launch.description = launch.details.substring(0, 30)
                        cell3.innerText = `${launch.description}...`
                    } else {
                        launch.description = `SpaceX flight #${launch.flight_number.toString()}`
                        cell3.innerText = `${launch.description}`
                    }
                } else {
                    if (launch.details != null){
                        launch.description = launch.details.substring(0, 200)
                        cell3.innerText = `${launch.description}...`
                    } else {
                        launch.description = `SpaceX flight #${launch.flight_number.toString()}`
                        cell3.innerText = `${launch.description}`
                    }
                }
                cell1.innerText = `${launch.name}`
                cell2.innerText = `${date}`

                // container.appendChild(card)
                // card.appendChild(h1)
                // card.appendChild(h2)
                // card.appendChild(p)

            })
        } else {
            console.log('error')
            // const errorMessage = document.createElement('marquee')
            // errorMessage.textContent = `Gah, it's not working!`
            // app.appendChild(errorMessage)
        }
    }

    request.send()
}

var scrollDiv = document.getElementById('scroll');

scrollDiv.style.cursor = 'pointer';
scrollDiv.onclick = function() {
    $('html, body').animate({scrollTop: $("#tableSection").offset().top}, 1000);
};

function getCountdownTime() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.spacexdata.com/v4/launches/next', true)

    request.onload = function () {
        var data = JSON.parse(this.response)

        launchDate = new Date(data.date_utc).getTime();
        launchName = data.name;

        console.log(launchDate);
    }

    // Send request
    request.send()
}


function countdown() {
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = launchDate - now;
    console.log(now);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('missName').innerText = launchName;

    document.getElementById('day').innerText = days;
    document.getElementById('hour').innerText = hours;
    document.getElementById('min').innerText = minutes;
    document.getElementById('sec').innerText = seconds;

}

getData();
getCountdownTime();
// countdown();

var countdownInterval = window.setInterval(function(){
    countdown();
}, 1000);

var getDataInterval = window.setInterval(function(){
    getData();
    getCountdownTime();
}, 180000);

