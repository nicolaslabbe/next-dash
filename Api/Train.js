const Libs = require("../Libs");
var apicache = require("apicache");

var express = require("express");
var router = express.Router();

let cache = apicache.middleware

router.get("/stations", cache('1 minute'), function(req, res) {
  Libs.sncf
    .findAll(JSON.parse(process.env.TRAIN_STOPS), process.env.TRAIN_BEARER)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, errors)
    );
});

router.get("/disruptions", cache('1 minute'), function(req, res) {
  Libs.sncf
    .disruptionsAll(
      JSON.parse(process.env.TRAIN_STOPS),
      process.env.TRAIN_BEARER
    )
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, errors)
    );
});

module.exports = router;
