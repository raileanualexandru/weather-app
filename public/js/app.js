console.log('client side javascript file');

const weatherform = document.querySelector('form');
const loc = document.getElementById('inputSearch');
let errorMessage = document.getElementById('errorMsg');
let locationData = document.getElementById('locationData');

weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    const locationInput = loc.value;
    locationData.innerHTML = 'Loading...';

    fetch(`/weather?address=${locationInput}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    errorMessage.innerHTML = data.error;
                    locationData.innerHTML = '';
                    console.log(data.error)
                } else {
                    errorMessage.innerHTML = '';
                    locationData.innerHTML = data.location;
                    console.log(data.Data)

                    let d = new Date();
                    day = d.getDay();
                    let dayArr = [];
                    for (let i = 0; i <= 6; i++) {
                        dayArr.push(day + i)
                    }
                    let k = 0;
                    for (let i = 0; i <= 6; i++) {

                        if (dayArr[i] > 6) {
                            dayArr[i] = k;
                            k++;
                        }
                    }

                    for (let i = 0; i <= 6; i++) {
                        switch (dayArr[i]) {
                            case 0: dayArr[i] = "Sunday";
                                break;
                            case 1: dayArr[i] = "Monday";
                                break;
                            case 2: dayArr[i] = "Tuesday";
                                break;
                            case 3: dayArr[i] = "Wednesday";
                                break;
                            case 4: dayArr[i] = "Thursday";
                                break;
                            case 5: dayArr[i] = "Friday";
                                break;
                            case 6: dayArr[i] = "Saturday";
                        }
                    }

                    data.Data.forEach(function (element, i) {

                        let today = new Date();
                        let dayDate = new Date(today);
                        dayDate.setDate(dayDate.getDate() + i);
                        var n = dayDate.toLocaleDateString();


                        document.getElementsByClassName('date')[i].innerHTML = n;
                        document.getElementsByClassName('day')[i].innerHTML = dayArr[i];

                        //document.getElementsByClassName('weather')[i].innerHTML = element.weather;

                        document.getElementById("weatherman").style.backgroundImage = "url('../img/forecast.jpg')";
                        document.getElementsByClassName('weatherImg')[i].src = `img/icons/${element.weather}.png`;

                        document.getElementsByClassName('min')[i].innerHTML = 'min: ' + element.temp2m.min + '°C';
                        document.getElementsByClassName('max')[i].innerHTML = 'max: ' + element.temp2m.max + '°C';


                        switch (element.wind10m_max) {
                            case 1: wind = 'Below 0.3m/s (calm)';
                                break;
                            case 2: wind = '0.3-3.4m/s (light)';
                                break;
                            case 3: wind = '3.4-8.0m/s (moderate)';
                                break;
                            case 4: wind = '8.0-10.8m/s (fresh)';
                                break;
                            case 5: wind = '10.8-17.2m/s (strong)';
                                break;
                            case 6: wind = '17.2-24.5m/s (gale)';
                                break;
                            case 7: wind = '24.5-32.6m/s (storm)';
                                break;
                            case 8: wind = 'Over 32.6m/s (hurricane)';

                        }

                        document.getElementsByClassName('wind')[i].innerHTML = 'wind speed: ' + wind;

                    });
                }

            })
        })

})

