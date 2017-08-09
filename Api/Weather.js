import fetch from 'fetch-everywhere'

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send({
		status: 200,
		result: null
	});
});

router.get('/find/:id?', function(req, res) {
	fetch(`http://api.openweathermap.org/data/2.5/forecast/${req.params.id}?units=metric&id=${req.params.id}&APPID=${process.env.OPEN_WEATHER}`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson.list[0]
			res
			.status(200)
			.send({
				status: 200,
				result: {
					degree: result.main.temp,
					humidity: result.main.humidity,
					label: result.weather[0].main,
					description: result.weather[0].description,
					icon: result.weather[0].icon,
					wind: result.wind.speed
				}
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