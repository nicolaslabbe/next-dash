const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

router.get("/stations", function(req, res) {
  var promises = [];
  var results = [];
  var errors = [];
  Array.prototype.forEach.call(JSON.parse(process.env.TRAIN_STOPS), item => {
    promises.push(
      Libs.sncf.find(item.id, item.direction, process.env.TRAIN_BEARER).then(
        result => {
          results.push(result);
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
      Libs.sncf.disruptions(item.id, process.env.TRAIN_BEARER).then(
        result => {
          results.push(result);
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
