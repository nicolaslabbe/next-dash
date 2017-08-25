const success = (res, data) => {
	res
		.status(200)
		.send({
			status: 200,
			result: data
		})
}

const error = (res, err) => {
	res
		.status(400)
		.send({
			status: 400,
			error: err
		})
}

module.exports = {
	success,
	error
}