const Libs = require('../Libs')

var express = require('express')
var router = express.Router();

router.get('/:name?', function(req, res) {
	if (Libs.req.param(req, res, 'name')) {
		var fixture = require(`../Fixtures/${req.params.name}`)
		var json = {}
		if (fixture && fixture.default && typeof fixture.default === 'function') {
			json = fixture.default()
		}else if (fixture && fixture && typeof fixture === 'function') {
			json = fixture()
		}else if (fixture && fixture.default) {
			json = fixture.default
		}else {
			json = fixture
		}

		Libs.status.success(res, json)
	}
});

module.exports = router;