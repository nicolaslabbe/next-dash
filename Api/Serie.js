const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

router.get("/:page?", function(req, res) {
  Libs.tmdbSerie
    .popular(process.env.IMDB_API_KEY, Libs.req.page(req))
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.error(res, error)
      )
      .catch(error => Libs.status.success(res, error));
});

router.get("/find/:id", function(req, res) {
  Libs.tmdbSerie
    .findById(process.env.IMDB_API_KEY, req.params.id)
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.error(res, error)
      )
      .catch(error => Libs.status.success(res, error));
});

router.get("/:query?/:page?", function(req, res) {
  Libs.tmdbSerie
    .findById(process.env.IMDB_API_KEY, req.params.query, Libs.req.page(req))
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.error(res, error)
      )
      .catch(error => Libs.status.success(res, error));
});

module.exports = router;
