const Libs = require("../Libs");

var express = require("express");
var apicache = require("apicache");
var router = express.Router();
let cache = apicache.middleware;

router.get(
  "/",
  /* cache("2 minutes"), */ function(req, res) {
    var promises = [];
    var results = [];

    results.push({
      url: "/db?type=news",
      name: "news",
      className: "news",
      icon: "info",
      size: {
        xs: 12,
        sm: 6
      }
    });

    results.push({
      url: "/db?type=weather&display=list",
      name: "weather",
      className: "weather",
      icon: "wb_sunny",
      size: {
        xs: 12,
        sm: 6
      }
    });

    results.push({
      url: "/db?type=train&display=list",
      name: "train",
      className: "train",
      icon: "train",
      size: {
        xs: 12,
        sm: 6
      }
    });

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
  }
);

module.exports = router;
