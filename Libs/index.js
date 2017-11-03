const filesystem = require("./filesystem");
const status = require("./status");
const req = require("./req");
const db = require("./db");
const sncf = require("./sncf");
const push = require("./push");
const tmdbSerie = require("./tmdbSerie");
const tmdbMovie = require("./tmdbMovie");
const weather = require("./weather");

module.exports = {
  db,
  filesystem,
  status,
  req,
  sncf,
  push,
  tmdbSerie,
  tmdbMovie,
  weather
};
