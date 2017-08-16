import fetch from 'fetch-everywhere'
import moment from 'moment'
import Libs from '../Libs'

var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
})

router.get('/find/:stopId?/:direction?/:formatDate?', function(req, res) {
	const stopId = req.params.stopId || '87686006'
	const direction = req.params.direction || 'Melun'
	const date = new Date().toISOString().replace(/-|:/g, '').split('.')[0]

	fetch(`https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area:OCE:SA:${stopId}/departures?datetime=${date}&data_freshness=realtime&count=100`,
		{
			method: 'GET',
			headers: {
				'Authorization': '' + process.env.TRAIN_BEARER
			}
		})
		.then((response) => response.json())
		.then((responseJson) => {
			try	{
				var formatted = {}
				Array.prototype.forEach.call(responseJson.departures, (departure) => {
					if (departure.route.direction.name.toLowerCase().indexOf(direction.toLowerCase()) > -1) {
						let formattedDate = moment(departure.stop_date_time.departure_date_time)

						if(typeof formatted[departure.display_informations.direction] === 'undefined'
							|| formatted[departure.display_informations.direction] === null) {
							formatted[departure.display_informations.direction] = {
								name: departure.stop_point.name,
								departures: []
							}
						}
						formatted[departure.display_informations.direction].departures.push({
							time: departure.stop_date_time.arrival_date_time,
							formatted: (req.params.formatDate) ? formattedDate.format(req.params.formatDate) : formattedDate,
							direction: departure.route.direction.name,
							line: departure.route.line.code,
							color: departure.route.line.color
						})
					}
				})
				Libs.status.success(res, formatted)
			}catch(e) {
				Libs.status.error(res, e)
			}
		})
		.catch((error) => {
			Libs.status.error(res, error)
		})
})

module.exports = router