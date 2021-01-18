const fetch = require('node-fetch');

const geoToken = 'pk.eyJ1IjoiYWxleHJhaWxlYW51OTEiLCJhIjoiY2tqOGZ2Nm1jMW9waDJ6bnFtbXJhdnNpZCJ9.VeBNgeg8WaDubhTitrH5Ww';

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geoToken}&limit=1`;
 
    fetch(url)
       .then(response => response.json())
       .then(data => {
          if (data.features.length === 0) {
              //handle client error
             callback('Unable to find location. Try another search!', undefined)
          } else {
             callback(undefined, {
                long: data.features[0].center[0],
                lat: data.features[0].center[1],
                location: data.features[0].place_name
             })
          }
 
       })
       .catch(error => {
          //handle server error
          callback('unable to connect to geolocation service!', undefined)
 
       });
 }
 
 module.exports = geocode;