const fetch = require('fetch-everywhere')
const Libs = require('../Libs')

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
});

router.get('/find/:source?/:sort?', function(req, res) {
	const source = req.params.source || 'time'
	const sort = req.params.sort || 'latest'
	fetch(`https://newsapi.org/v1/articles?source=${source}&sortBy=${sort}&apiKey=${process.env.NEWS_TOKEN}`)
		.then((response) => response.json())
		.then((responseJson) => {
			Libs.status.success(res, responseJson.articles)
		})
		.catch((error) => {
			Libs.status.error(res, error)
		})
})

module.exports = router;