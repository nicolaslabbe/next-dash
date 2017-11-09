const Libs = require("../Libs");
var apicache = require("apicache");

var express = require("express");
var router = express.Router();

let cache = apicache.middleware;

router.get(
  "/:page?",
  /* cache("2 minutes"),*/ function(req, res) {
    if (req.params.page > 1) {
      return Libs.status.success(res, []);
    }

    Libs.db
      .all("serie")
      .then(
        data => {
          Libs.status.success(res, data);
        },
        error => Libs.status.success(res, [])
      )
      .catch(error => Libs.status.success(res, []));
  }
);

router.get("/:page?", cache("2 minutes"), function(req, res) {
  Libs.tmdbSerie
    .popular(process.env.IMDB_API_KEY, Libs.req.page(req))
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, error)
    )
    .catch(error => Libs.status.success(res, error));
});

router.get("/find/:id", cache("2 minutes"), function(req, res) {
  Libs.tmdbSerie
    .findById(process.env.IMDB_API_KEY, req.params.id)
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, error)
    )
    .catch(error => Libs.status.success(res, error));
});

router.get("/:query/:page", cache("2 minutes"), function(req, res) {
  Libs.tmdbSerie
    .search(process.env.IMDB_API_KEY, req.params.query, Libs.req.page(req))
    .then(
      result => Libs.status.success(res, result),
      error => Libs.status.error(res, error)
    )
    .catch(error => Libs.status.success(res, error));
});

module.exports = router;
