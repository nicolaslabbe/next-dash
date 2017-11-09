const Libs = require("../Libs");
var apicache = require("apicache");
var express = require("express");
var router = express.Router();

let cache = apicache.middleware;

router.get("/:page?", /* cache("2 minutes"), */ function(req, res) {
  if (req.params.page > 1) {
    return Libs.status.success(res, [])
  }

  Libs.db
    .all('weather')
    .then(
      data => {
        Libs.status.success(res, data)
      },
      error => Libs.status.success(res, [])
    )
    .catch(error => Libs.status.success(res, []));
});

router.get("/find/:id", /* cache("1 minute"), */ function(req, res) {
  Libs.weather
    .find(req.params.id, process.env.OPEN_WEATHER)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, errors)
    );
});

router.get("/:query/:page", /* cache("1 minute"), */ function(req, res) {
  Libs.weather
    .search(req.params.query, process.env.OPEN_WEATHER)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, errors)
    );
});

module.exports = router;
