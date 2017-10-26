const fetch = require('fetch-everywhere')
const moment = require('moment')
const Libs = require('../Libs')
const Utils = require('../Utils')

var express = require('express')
var router = express.Router()

const formatResult = (result) => {
	var newResult = result.map((item) => {
		var newItem = {
			title: `${item.station} / ${Utils.string.trimBracket(item.terminus)}`,
			items: item.departures && item.departures.map((departure) => {
				return {
					left: Utils.date.HHmm(departure.time),
					right: Utils.date.remaining(departure.time)
				}
			})
		}
		return newItem
	})
	return newResult
}

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
})

router.post('/find', function(req, res) {
	var promises = []
	var results = []
	var errors = []
	Array.prototype.forEach.call(req.body, (item) => {
		promises.push(Libs.sncf.find(item.id, item.direction, process.env.TRAIN_BEARER)
			.then((res) => {
				results.push(formatResult(res))
			},
			(error) => errors.push(error)))
	})

	Promise.all(promises)
		.then(() => {
			Libs.status.success(res, results)
		})
		.catch((e) => {
			Libs.status.error(res, errors)})
})

module.exports = router