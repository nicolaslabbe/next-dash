const Weather = require("./Weather");
const News = require("./News");
const Train = require("./Train");
const Db = require("./Db");
const Fixture = require("./Fixture");
const Movie = require("./Movie");
const Serie = require("./Serie");
const Quefaire = require("./Quefaire");
const Push = require("./Push");
const Dashboard = require("./Dashboard");

var express = require("express");
var router = express.Router();

// define the home page route
router.use("/dashboard", Dashboard);
router.use("/quefaire", Quefaire);
router.use("/weather", Weather);
router.use("/news", News);
router.use("/train", Train);
router.use("/db", Db);
router.use("/fixture", Fixture);
router.use("/movie", Movie);
router.use("/serie", Serie);
router.use("/push", Push);

module.exports = router;
