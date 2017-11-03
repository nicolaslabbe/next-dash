const Libs = require("../Libs");
var apicache = require("apicache");
var express = require("express");
var router = express.Router();

let cache = apicache.middleware;

router.get("/current", cache("10 minutes"), function(req, res) {
  Libs.weather
    .find(process.env.OPEN_WEATHER_CITY, process.env.OPEN_WEATHER)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.success(res, error)
    )
    .catch(error => Libs.status.success(res, error));
});

module.exports = router;
