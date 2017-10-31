const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

const baseUrl = `https://api.themoviedb.org/3/`;

router.get("/:page?", function(req, res) {
  fetch(
    `${baseUrl}movie/popular?api_key=${process.env.IMDB_API_KEY}&${Libs.req.page(req)}`
  )
    .then(response => response.json())
    .then(responseJson => {
      Libs.status.success(res, Libs.tmdb.formatMovies(responseJson.results));
    })
    .catch(error => {
      Libs.status.success(res, error);
    });
});

router.get("/find/:id", function(req, res) {
  fetch(`${baseUrl}movie/${req.params.id}?api_key=${process.env.IMDB_API_KEY}`)
    .then(response => response.json())
    .then(responseJson => {
      var result = Libs.tmdb.formatMovie(responseJson);

      fetch(
        `${baseUrl}movie/${req.params.id}/videos?api_key=${process.env
          .IMDB_API_KEY}`
      )
        .then(response => response.json())
        .then(responseJson => {
          result.videos = responseJson.results;

          Libs.status.success(res, result);
        })
        .catch(error => {
          Libs.status.success(res, error);
        });
    })
    .catch(error => {
      Libs.status.success(res, error);
    });
});

router.get("/:query?/:page?", function(req, res) {
  fetch(
    `${baseUrl}search/movie?api_key=${process.env.IMDB_API_KEY}&query=${req.params.query}&${Libs.req.page(req)}&include_adult=true`)
    .then(response => response.json())
    .then(responseJson => {
      Libs.status.success(res, Libs.tmdb.formatMovies(responseJson.results));
    })
    .catch(error => {
      Libs.status.success(res, error);
    });
});

module.exports = router;
