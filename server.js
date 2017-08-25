const express = require('express')
const next = require('next')
const api = require('./Api')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use(express.static('./node_modules/material-design-icons/iconfont/'));
  server.use(express.static('./static/fonts/'));
  server.use( bodyParser.json() )
  server.use(bodyParser.urlencoded({
    extended: true
  }))

  server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    next()
  })

  server.use('/api', api);

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on ${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`)
  })
})