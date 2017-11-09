const fetch = require("fetch-everywhere");
const Libs = require("../Libs");
var apicache = require("apicache");
var express = require("express");
var router = express.Router();

let cache = apicache.middleware;

router.get(
  "/:page?",
  /* cache("2 minutes"), */ function(req, res) {
    if (req.params.page > 1) {
      return Libs.status.success(res, []);
    }

    Libs.news
      .find("time", "latest", process.env.NEWS_TOKEN, Libs.req.page(req))
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.success(res, error)
      )
      .catch(error => Libs.status.success(res, error));
  }
);

module.exports = router;
