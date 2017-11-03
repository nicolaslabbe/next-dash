const Libs = require("../Libs");

var express = require("express");
var apicache = require("apicache");
var router = express.Router();
let cache = apicache.middleware

router.get("/", cache('2 minutes'), function(req, res) {
  var promises = [];
  var results = {};

  promises.push(
    Libs.weather
      .find(process.env.OPEN_WEATHER_CITY, process.env.OPEN_WEATHER)
      .then(
        result => (results.weather = { items: result, error: null }),
        error => (results.weather = { items: [], error: error })
      )
  );

  promises.push(
    Libs.sncf
      .findAll(JSON.parse(process.env.TRAIN_STOPS), process.env.TRAIN_BEARER)
      .then(
        result => (results.stations = { items: result, error: null }),
        error => (results.stations = { items: [], error: error })
      )
  );

  promises.push(
    Libs.sncf
      .disruptionsAll(
        JSON.parse(process.env.TRAIN_STOPS),
        process.env.TRAIN_BEARER
      )
      .then(
        result => (results.disruptions = { items: result, error: null }),
        error => (results.disruptions = { items: [], error: error })
      )
  );

  promises.push(
    Libs.tmdbSerie
      .popular(process.env.IMDB_API_KEY, 1)
      .then(
        result => (results.serie = { items: result, error: null }),
        error => (results.serie = { items: [], error: error })
      )
  );

  promises.push(
    Libs.tmdbMovie
      .popular(process.env.IMDB_API_KEY, 1)
      .then(
        result => (results.movie = { items: result, error: null }),
        error => (results.movie = { items: [], error: error })
      )
  );

  Promise.all(promises)
    .then(() => {
      Libs.status.success(res, results);
    })
    .catch(e => {
      Libs.status.error(res, errors);
    });
});

module.exports = router;
