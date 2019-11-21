const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoiamx1bmRncmVuIiwiYSI6ImNrMzI1ODExZTA4anMzaGxlM2ZhYWttZDQifQ.NDL2jJJuBgT_qfBUB9wj4A`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to services', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        long: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      });
    }
  });
};

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/c430017faddc99043fb4eaa678e6372a/${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect', undefined);
    } else if (body.error) {
      callback('there was an error', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degress out. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = { geocode, forecast };
