const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { geocode, forecast } = require('./utils/utils.js');

const app = express();

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jeff Me'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jeff Me'
  });
});
app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    res.send({
      error: 'Please provide an address'
    });
  } else {
    geocode(address, (error, { lat, long, location } = {}) => {
      if (error) {
        res.send({ error: 'unable to find location' });
      } else {
        forecast(lat, long, (error, forecastData) => {
          if (error) {
            res.send(error);
          } else {
            res.send({
              location,
              forecast: forecastData,
              address
            });
          }
        });
      }
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'Please provide a search term'
    });
  } else {
    res.send({
      products: []
    });
  }
});

app.get('/help/*', (req, res) => {
  re.send({
    title: '404 Not Found',
    error: 'page not found'
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    error: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
