const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

router.get("/current", function(req, res) {
  Libs.weather.find(process.env.OPEN_WEATHER_CITY, process.env.OPEN_WEATHER)
    .then(
        result => Libs.status.success(res, result),
        error => Libs.status.success(res, error)
      )
    .catch(error => Libs.status.success(res, error))
});

module.exports = router;
