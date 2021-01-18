const fetch = require('node-fetch');

const forecast = (long, lat, callback)=>{
   fetch(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civillight&output=json`)
   .then(response => response.json())
   .then(data => {
     
         callback(undefined,{
            data: data
         })  
   })
   .catch(error => {
      //handle server error
      callback('unable to connect to weather service!',undefined)
   });
}

module.exports = forecast;