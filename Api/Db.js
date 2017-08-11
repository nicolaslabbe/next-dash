import fetch from 'fetch-everywhere'
import Utils from '../Utils'

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Utils.status.success(res, 'ok')
});

router.get('/:name?', function(req, res) {
	if (Utils.req.param(req, res, 'name')) {
		Utils.fs.read(Utils.config.pathData, `${req.params.name}.json`, req.body)
			.then((data) => Utils.status.success(res, data),
			(err) => Utils.status.error(res, error))
	}
});

router.post('/:name?', function(req, res) {
	if (Utils.req.param(req, res, 'name')) {
		Utils.fs.write(Utils.config.pathData, `${req.params.name}.json`, req.body)
			.then((data) => Utils.status.success(res, 'ok'),
			(err) => Utils.status.error(res, error))
	}
});

router.put('/:name?', function(req, res) {
	if (Utils.req.param(req, res, 'name')) {
		Utils.fs.update(Utils.config.pathData, `${name}.json`, req.body)
			.then((data) => Utils.status.success(res, 'ok'),
			(err) => Utils.status.error(res, error))
	}
});

router.patch('/:name?', function(req, res) {
	if (Utils.req.param(req, res, 'name')) {
		Utils.fs.merge(Utils.config.pathData, `${name}.json`, req.body)
			.then((data) => Utils.status.success(res, 'ok'),
			(err) => Utils.status.error(res, error))
	}
});

router.delete('/:name?', function(req, res) {
	if (Utils.req.param(req, res, 'name')) {
		Utils.fs.remove(Utils.config.pathData, `${name}.json`)
			.then((data) => Utils.status.success(res, 'ok'),
			(err) => Utils.status.error(res, error))
	}
});

module.exports = router;