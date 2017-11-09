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
    .all('train')
    .then(
      data => {
        Libs.status.success(res, data)
      },
      error => Libs.status.success(res, [])
    )
    .catch(error => Libs.status.success(res, []));
});

router.get("/find/:id", /* cache("1 minute"), */ function(req, res) {
  Libs.sncf
    .find(req.params.id, process.env.TRAIN_BEARER)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, error)
    );
});

router.get("/:query/:page", /* cache("1 minute"), */ function(req, res) {
  Libs.sncf
    .search(req.params.query, process.env.TRAIN_BEARER)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, error)
    );
});

module.exports = router;
