const moment = require('moment')

module.exports.timestampToHumain = (str) => moment(str).fromNow()

module.exports.remaining = (str) => {
	const time = moment(parseInt(str))
	const now = moment()
	let diff = time.diff(now, 'minutes')
	if(diff < 10 && diff > 0) {
		diff = `0${diff}`
	}
	return time.format('hh:mm')
}