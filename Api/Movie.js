const moment = require('moment')
const imdb = require('imdb-api')
const Libs = require('../Libs')

var express = require('express')
var router = express.Router()

const baseUrl = `https://api.themoviedb.org/3/`
const getPage = (req) => {
	return req.params.page ?  `page=${req.params.page}` : ''
}

const getPoster = (item) => {
	return {
		xsr: `http://image.tmdb.org/t/p/w92/${item.poster_path}`,
		xs: `http://image.tmdb.org/t/p/w154/${item.poster_path}`,
		sm: `http://image.tmdb.org/t/p/w185/${item.poster_path}`,
		md: `http://image.tmdb.org/t/p/w342/${item.poster_path}`,
		xl: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
		xlr: `http://image.tmdb.org/t/p/w780/${item.poster_path}`,
	}
}

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
});

router.get('/popular/:page?', function(req, res) {
	fetch(`${baseUrl}movie/popular?api_key=${process.env.IMDB_API_KEY}&${getPage(req)}`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson.results

			Libs.status.success(res, result)
		})
		.catch((error) => {
			Libs.status.success(res, error)
		});
});

router.get('/discover/:page?', function(req, res) {
	var futurDate = moment().format('YYYY-MM-DD')
	fetch(`${baseUrl}discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=true&primary_release_date.gte=${futurDate}&api_key=${process.env.IMDB_API_KEY}&${getPage(req)}`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson.results

			result.map((item) => {
				item.poster = getPoster(item)
				return item
			})

			Libs.status.success(res, result)
		})
		.catch((error) => {
			Libs.status.success(res, error)
		});
});

router.get('/find/:id', function(req, res) {
	var futurDate = moment().format('YYYY-MM-DD')
	fetch(`${baseUrl}movie/${req.params.id}?api_key=${process.env.IMDB_API_KEY}`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson
			result.poster = getPoster(result)

			fetch(`${baseUrl}movie/${req.params.id}/videos?api_key=${process.env.IMDB_API_KEY}`)
				.then((response) => response.json())
				.then((responseJson) => {
					result.videos = responseJson.results

					Libs.status.success(res, result)
				})
				.catch((error) => {
					Libs.status.success(res, error)
				});
		})
		.catch((error) => {
			Libs.status.success(res, error)
		});
});

router.get('/:query?/:page?', function(req, res) {
	console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
	console.log(req.params)
	fetch(`${baseUrl}search/movie?api_key=${process.env.IMDB_API_KEY}&query=${req.params.query}&${getPage(req)}&include_adult=true`)
		.then((response) => response.json())
		.then((responseJson) => {
			var result = responseJson.results

			result.map((item) => {
				item.poster = getPoster(item)
				return item
			})

			Libs.status.success(res, result)
		})
		.catch((error) => {
			Libs.status.success(res, error)
		});
});

module.exports = router;