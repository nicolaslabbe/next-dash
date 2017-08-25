const status = require("./status")

module.exports.param = (req, res, name) => {
	if (!req.params[name]) {
		Utils.status.error(res, 'missing parameter `${name}`')
		return false
	}else {
		return req.params[name]
	}
}