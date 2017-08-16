import fetch from 'fetch-everywhere'
import Libs from '../Libs'
import Utils from '../Utils'

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
});

router.get('/:name?/:key?/:value?', function(req, res) {
	if (Libs.req.param(req, res, 'name')) {
		if (req.params.key && req.params.value) {
			Libs.db.find(req.params.name, req.params.key, req.params.value)
				.then((data) => Libs.status.success(res, data),
				(error) => Libs.status.error(res, error))
		}else {
			Libs.db.all(req.params.name)
				.then((data) => Libs.status.success(res, data),
				(error) => Libs.status.error(res, error))
		}
	}
});

router.post('/:name?', function(req, res) {
	if (Libs.req.param(req, res, 'name')) {
		Libs.db.add(req.params.name, req.body)
			.then((data) => Libs.status.success(res, data),
			(error) => Libs.status.error(res, error))
	}
});

router.put('/:name?', function(req, res) {
	if (Libs.req.param(req, res, 'name')) {
		Libs.filesystem.update(Utils.config.pathData, `${req.params.name}.json`, req.body)
			.then((data) => Libs.status.success(res, data),
			(error) => Libs.status.error(res, error))
	}
});

router.patch('/:name?', function(req, res) {
	if (Libs.req.param(req, res, 'name')) {
		Libs.filesystem.merge(Utils.config.pathData, `${req.params.name}.json`, req.body)
			.then((data) => Libs.status.success(res, data),
			(error) => Libs.status.error(res, error))
	}
});

router.delete('/:name?/:key?/:value?', function(req, res) {
	if (Libs.req.param(req, res, 'name')) {
		if (req.params.key && req.params.value) {
			Libs.db.remove(req.params.name, req.params.key, req.params.value)
				.then((data) => Libs.status.success(res, data),
				(error) => Libs.status.error(res, error))
		}else {
			Libs.db.removeAll(req.params.name)
				.then((data) => Libs.status.success(res, data),
				(error) => Libs.status.error(res, error))
		}
	}
});

module.exports = router;