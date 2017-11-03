const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

router.get("/stations", function(req, res) {
  Libs.sncf
  .findAll(JSON.parse(process.env.TRAIN_STOPS), process.env.TRAIN_BEARER)
  .then(
    result => Libs.status.success(res, result),
    error => Libs.status.error(res, errors))
});

router.get("/disruptions", function(req, res) {
  Libs.sncf
  .disruptionsAll(JSON.parse(process.env.TRAIN_STOPS), process.env.TRAIN_BEARER)
  .then(
    result => Libs.status.success(res, result),
    error => Libs.status.error(res, errors))
});

module.exports = router;
