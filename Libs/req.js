const status = require("./status")

const param = (req, res, name) => {
	if (!req.params[name]) {
		Utils.status.error(res, 'missing parameter `${name}`')
		return false
	}else {
		return req.params[name]
	}
}

module.exports = {
	param
}