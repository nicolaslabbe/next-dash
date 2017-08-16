import moment from 'moment'

export const timestampToHumain = (str) => moment(str).fromNow()

export const remaining = (str) => {
	const time = moment(parseInt(str))
	const now = moment()
	let diff = time.diff(now, 'minutes')
	if(diff < 10 && diff > 0) {
		diff = `0${diff}`
	}
	return time.format('hh:mm')
}