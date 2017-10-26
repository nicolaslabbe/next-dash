const fetch = require('fetch-everywhere')
const Libs = require('../Libs')

var express = require('express');
var router = express.Router();

const getPoster = (item) => {
	return {
		xsr: item.urlToImage,
		xs: item.urlToImage,
		sm: item.urlToImage,
		md: item.urlToImage,
		xl: item.urlToImage,
		xlr: item.urlToImage,
	}
}

const formatResult = (result) => {
	var newResult = result.map((item) => {
		var newItem = {
			date: item.publishedAt,
			title: item.title,
			tagline: item.description,
			url: item.url,
			image: getPoster(item).sm,
			overview: [
				{
					name: 'author',
					icon: 'create',
					value: item.author
				}
			]
		}
		return newItem
	})
	return newResult
}

router.get('/:page?', function(req, res) {
	const source = 'time'
	const sort = 'latest'
	fetch(`https://newsapi.org/v1/articles?source=${source}&sortBy=${sort}&apiKey=${process.env.NEWS_TOKEN}`)
		.then((response) => response.json())
		.then((responseJson) => {
			Libs.status.success(res, formatResult(responseJson.articles))
		})
		.catch((error) => {
			Libs.status.error(res, error)
		})
})

module.exports = router;