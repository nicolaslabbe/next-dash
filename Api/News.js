import fetch from 'fetch-everywhere'

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send({
		status: 200,
		result: null
	});
});

router.get('/find/:source?/:sort?', function(req, res) {
	const source = req.params.source || 'time'
	const sort = req.params.sort || 'latest'
	fetch(`https://newsapi.org/v1/articles?source=${source}&sortBy=${sort}&apiKey=${process.env.NEWS_TOKEN}`)
		.then((response) => response.json())
		.then((responseJson) => {
			res
			.status(200)
			.send({
				status: 200,
				result: responseJson.articles
			})
		})
		.catch((error) => {
			res
			.status(400)
			.send({
				status: 400,
				error: error
			})
		});
});

module.exports = router;