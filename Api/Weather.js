const moment = require('moment')
const Libs = require('../Libs')

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
});

router.get('/find/:id?', function(req, res) {
	fetch(`http://api.openweathermap.org/data/2.5/forecast/${req.params.id}?units=metric&id=${req.params.id}&APPID=${process.env.OPEN_WEATHER}`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson.list[0]
			responseJson.list.shift()

			result = {
				degree: result.main.temp,
				humidity: result.main.humidity,
				label: result.weather[0].main,
				description: result.weather[0].description,
				time: moment(result.dt_txt),
				icon: result.weather[0].icon,
				wind: result.wind.speed,
				futur: []
			}

			Array.prototype.forEach.call(responseJson.list, (value) => {
				result.futur.push({
					degree: value.main.temp,
					humidity: value.main.humidity,
					label: value.weather[0].main,
					description: value.weather[0].description,
					icon: value.weather[0].icon,
					time: moment(value.dt_txt),
					wind: value.wind.speed
				})
			})

			Libs.status.success(res, result)
		})
		.catch((error) => {
			Libs.status.success(res, error)
		});
});

module.exports = router;