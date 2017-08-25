const Weather = require('./Weather')
const News = require('./News')
const Train = require('./Train')
const Db = require('./Db')
const Fixture = require('./Fixture')

var express = require('express');
var router = express.Router();

// define the home page route
router.use('/weather', Weather);
router.use('/news', News);
router.use('/train', Train);
router.use('/db', Db);
router.use('/fixture', Fixture);

module.exports = router;