const Libs = require("../Libs");

var express = require("express");
var apicache = require("apicache");
var router = express.Router();
let cache = apicache.middleware;

router.get("/", cache("2 minutes"), function(req, res) {
  var promises = [];
  var results = [];

  promises.push(
    Libs.weather
      .find(process.env.OPEN_WEATHER_CITY, process.env.OPEN_WEATHER)
      .then(
        result =>
          results.push({
            items: result,
            error: null,
            url: "/weather",
            name: "weather",
            className: "weather",
            icon: "wb_sunny",
            size: {
              xs: 12,
              sm: 6
            }
          }),
        error => (results.weather = { items: [], error: error })
      )
  );

  promises.push(
    Libs.sncf
      .findAll(JSON.parse(process.env.TRAIN_STOPS), process.env.TRAIN_BEARER)
      .then(
        result =>
          results.push({
            items: result,
            error: null,
            url: "/train",
            name: "train",
            className: "train",
            icon: "train",
            size: {
              xs: 12,
              sm: 6
            }
          }),
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
        result =>
          results.push({
            items: result,
            error: null,
            url: "/train/disruptions",
            name: "disruptions",
            className: "disruptions",
            icon: "train",
            size: {
              xs: 12,
              sm: 6
            }
          }),
        error => (results.disruptions = { items: [], error: error })
      )
  );

  promises.push(
    Libs.news.find("time", "latest", process.env.NEWS_TOKEN, 1).then(
      result =>
        results.push({
          items: result,
          error: null,
          url: "/db?type=news",
          name: "news",
          className: "news",
          icon: "info",
          size: {
            xs: 12,
            sm: 6
          }
        }),
      error => (results.news = { items: [], error: error })
    )
  );

  results.push({
    url: "/db?type=movie",
    name: "movie",
    className: "movie",
    icon: "local_movies",
    size: {
      xs: 12,
      sm: 6
    }
  });

  results.push({
    url: "/db?type=serie",
    name: "serie",
    className: "serie",
    icon: "live_tv",
    size: {
      xs: 12,
      sm: 6
    }
  });

  results.push({
    url: "/db?type=notes",
    name: "notes",
    className: "notes",
    icon: "list",
    size: {
      xs: 12,
      sm: 6
    }
  });

  Promise.all(promises)
    .then(() => {
      Libs.status.success(res, results);
    })
    .catch(e => {
      Libs.status.error(res, errors);
    });
});

module.exports = router;
