import React from 'react'
import { Line } from "nivo"

import fetch from 'fetch-everywhere'
import Libs from '../Libs'
import Utils from '../Utils'

const { renderToStaticMarkup } = require('react-dom/server')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	Libs.status.success(res, 'ok')
});

router.post('/line', function(req, res) {
	const axisBottom = {"orient":"bottom","tickSize":0,"tickPadding":10,"tickRotation":0,"legend":"force","legendOffset":36,"legendPosition":"center"}
	const axisLeft = {"orient":"left","tickSize":0,"tickPadding":10,"tickRotation":0,"legend":"degree","legendOffset":-40,"legendPosition":"center"}
	const margin = {"top":20,"right":15,"bottom":25,"left":25}

	var data = req.body.data
	if(typeof req.body.data === 'string') {
		data = JSON.parse(req.body.data)
	}

	console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
	console.log('req.body', req.body)
	
	var width = req.body.width ? req.body.width : 250
	var height = req.body.height ? req.body.height : 250
	
	const rendered = renderToStaticMarkup(
		<Line
			width={width}
			height={height}
			margin={margin}
			axisBottom={axisBottom}
			enableGridX={false}
			enableGridY={false}
			axisLeft={axisLeft}
			stacked={false}
			curve="basis"
			colorBy={function (e){return e.color}}
			enableMarkers={true}
			markersSize={0}
			markersColor="inherit:darker(.3)"
			markersBorderWidth={2}
			markersBorderColor="#fff"
			enableMarkersLabel={false}
			markersLabel="y"
			markersLabelYOffset={-12}
			animate={false}
			motionStiffness={90}
			motionDamping={15}
			isInteractive={false}
			enableStackTooltip={true}
			data={data}
			getIndex={function (e){ return e }}
			/>
	)

	res.status(200)
		.set('Content-Type', 'text/xml')
		.send(`<?xml version="1.0" ?>${rendered}`)
});

module.exports = router;