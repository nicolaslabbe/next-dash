import fetch from 'fetch-everywhere'

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Utils.status.success(res, 'ok')
});

router.get('/find/:id?', function(req, res) {
	fetch(`http://api.openweathermap.org/data/2.5/forecast/${req.params.id}?units=metric&id=${req.params.id}&APPID=${process.env.OPEN_WEATHER}`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson.list[0]
			Utils.status.success(res, {
				degree: result.main.temp,
				humidity: result.main.humidity,
				label: result.weather[0].main,
				description: result.weather[0].description,
				icon: result.weather[0].icon,
				wind: result.wind.speed
			})
		})
		.catch((error) => {
			Utils.status.success(res, error)
		});
});

module.exports = router;