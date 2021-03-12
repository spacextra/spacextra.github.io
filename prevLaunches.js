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
    request.open('GET', 'https://api.spacexdata.com/v4/launches/past', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            data.slice().reverse().forEach((launch) => {
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
                        launch.description = launch.details
                        cell3.innerText = `${launch.description}`
                    } else {
                        launch.description = `SpaceX flight #${launch.flight_number.toString()}`
                        cell3.innerText = `${launch.description}`
                    }
                } else {
                    if (launch.details != null){
                        launch.description = launch.details
                        cell3.innerText = `${launch.description}`
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
    // var row = app.insertRow(-1);
    // var cell1 = row.insertCell(0);
    // var cell2 = row.insertCell(1);
    // var cell3 = row.insertCell(2);

    // cell3.innerText = ` `
    // cell1.innerText = ` `
    // cell2.innerText = ` `
}


getData();
// countdown();

var getDataInterval = window.setInterval(function(){
    getData();
}, 180000);

