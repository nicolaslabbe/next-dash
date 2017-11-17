const filesystem = require("./filesystem");
const status = require("./status");
const req = require("./req");
const db = require("./db");
const sncf = require("./sncf");
const push = require("./push");
const tmdb = require("./tmdb");
const weather = require("./weather");
const news = require("./news");
const quefaire = require("./quefaire");

module.exports = {
  db,
  filesystem,
  status,
  req,
  sncf,
  push,
  tmdb,
  weather,
  news,
  quefaire
};
