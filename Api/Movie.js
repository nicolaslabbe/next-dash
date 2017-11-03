const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

const baseUrl = `https://api.themoviedb.org/3/`;

router.get("/:page?", function(req, res) {
  Libs.tmdbMovie
    .popular(process.env.IMDB_API_KEY, Libs.req.page(req))
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.error(res, error)
      )
      .catch(error => Libs.status.success(res, error));
});

router.get("/find/:id", function(req, res) {
  Libs.tmdbMovie
    .findById(process.env.IMDB_API_KEY, req.params.id)
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.error(res, error)
      )
      .catch(error => Libs.status.success(res, error));
});

router.get("/:query?/:page?", function(req, res) {
  Libs.tmdbMovie
    .findById(process.env.IMDB_API_KEY, req.params.query, Libs.req.page(req))
      .then(
        result => Libs.status.success(res, result),
        error => Libs.status.error(res, error)
      )
      .catch(error => Libs.status.success(res, error));
});

module.exports = router;
