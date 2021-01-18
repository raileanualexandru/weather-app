const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for Express config
const publicDirectoryPath = path.join(__dirname ,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
    res.render('index', {
        title: "Use this site to get your weather forecast for 7 days "
    })
});

app.get('/weather', (req, res) => {
if(!req.query.address){
    return res.send('you must enter a address')
}

geocode(req.query.address, (error, data) => {
    if (error) {
       return res.send({error: error});
    }
 
    forecast(data.long, data.lat, (error, forecastData) => {
       if (error) {
          return res.send({error: error});
       }
 
       res.send({
           location:data.location,
           Data: forecastData.data.dataseries
        });
    })
 
 })
 

})



app.get('*', (req, res) => {
    res.send('404 page')
});


app.listen(port, ()=>{
    console.log('server is up on port' + port);
});