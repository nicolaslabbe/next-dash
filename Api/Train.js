const fetch = require("fetch-everywhere");
const moment = require("moment");
const Libs = require("../Libs");
const Utils = require("../Utils");

var express = require("express");
var router = express.Router();

router.get("/stations", function(req, res) {
  var promises = [];
  var results = [];
  var errors = [];
  Array.prototype.forEach.call(JSON.parse(process.env.TRAIN_STOPS), item => {
    promises.push(
      Libs.sncf.find(item.id, item.direction, process.env.TRAIN_BEARER).then(
        res => {
          results.push(Libs.sncf.formatResult(res));
        },
        error => errors.push(error)
      )
    );
  });

  Promise.all(promises)
    .then(() => {
      Libs.status.success(res, results);
    })
    .catch(e => {
      Libs.status.error(res, errors);
    });
});

router.get("/disruptions", function(req, res) {
  var promises = [];
  var results = [];
  var errors = [];
  Array.prototype.forEach.call(JSON.parse(process.env.TRAIN_STOPS), item => {
    promises.push(
      Libs.sncf.find(item.id, item.direction, process.env.TRAIN_BEARER).then(
        res => {
          results.push(Libs.sncf.formatDisruptions(res));
        },
        error => errors.push(error)
      )
    );
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
