import fetch from 'fetch-everywhere'
import moment from 'moment'
import Libs from '../Libs'

export const find = (stopId, directions, bearer, limit = 10) => {
	const date = new Date().toISOString().replace(/-|:/g, '').split('.')[0]
	return new Promise((resolve, reject) => {
		fetch(`https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area:OCE:SA:${stopId}/departures?datetime=${date}&data_freshness=realtime&count=100`,
			{
				method: 'GET',
				headers: {
					'Authorization': '' + bearer
				}
			})
			.then((response) => response.json())
			.then((responseJson) => {
				try	{
					var formatted = {
					}
					// return resolve(responseJson.departures)
					Array.prototype.forEach.call(responseJson.departures, (departure) => {
						Array.prototype.forEach.call(directions, (direction) => {
							const terminus = departure.display_informations.direction.toLowerCase()
							if (terminus.indexOf(direction.toLowerCase()) > -1) {
								if (typeof formatted[terminus] === 'undefined' || formatted[terminus] === null) {
									formatted[terminus] = {
										stopId: stopId,
										terminus: departure.display_informations.direction,
										station: departure.stop_point.name,
										code: departure.route.line.code,
										color: departure.route.line.color,
										name: departure.route.name,
										departures: []
									}
								}
								let formattedDate = moment(departure.stop_date_time.departure_date_time)

								if (formatted[terminus].departures.length < limit) {
									formatted[terminus].departures.push({
										time: moment(departure.stop_date_time.arrival_date_time).valueOf(),
										formatted: formattedDate
									})
								}
							}
						})
					})

					var stations = []
					Array.prototype.forEach.call(Object.keys(formatted), (name) => {
						stations.push(formatted[name])
					})
					resolve(stations)
				}catch(e) {
					reject(e)
				}
			})
			.catch((error) => {
				reject(e)
			})
	})
}