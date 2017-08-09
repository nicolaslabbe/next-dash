const express = require('express')
const next = require('next')
const api = require('./api')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

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