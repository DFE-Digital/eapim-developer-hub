const path = require('path')
const express = require('express')
const compression = require('compression')
const next = require('next')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

const getCredentials = require('./getCredentials')

app
  .prepare()
  .then(async () => {
    const server = express()

    server.use(helmet())
    server.use(compression())
    server.use(cookieParser())
    server.use(bodyParser.urlencoded({ extended: true }))

    const staticPath = path.join(__dirname, '../static')
    server.use('/static', express.static(staticPath, {
      maxAge: '30d',
      immutable: true
    }))

    const assetsPath = path.join(__dirname, '../assets')
    server.use('/assets', express.static(assetsPath, {
      maxAge: '30d',
      immutable: true
    }))

    server.all('*', getCredentials, (req, res) => {
      return handler(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.log(`> Error`)
    console.error(ex.stack)
    process.exit(1)
  })
