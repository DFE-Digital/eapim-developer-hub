require('dotenv').config()
const path = require('path')
const express = require('express')
const compression = require('compression')
const next = require('next')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app
  .prepare()
  .then(async () => {
    const server = express()

    const API_URL = process.env.PLATFORM_API_URL
    const B2C_URL = process.env.NEXT_PUBLIC_B2C_SIGNIN_URL.slice(0, process.env.NEXT_PUBLIC_B2C_SIGNIN_URL.lastIndexOf('/'))

    server.use(helmet())
    server.use(compression())
    server.use(cookieParser())
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json())

    server.use(function (req, res, next) {
      res.setHeader(
        'Content-Security-Policy',
        `default-src 'self'; connect-src 'self' ${API_URL}/ ${B2C_URL}/ https://dc.services.visualstudio.com/v2/track; style-src 'self' 'unsafe-hashes' http://highlightjs.org/static/demo/styles/github.css 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-5BwInUc1NDm54dXZnYOTjvDw+kJGXxHPQei88F1ygIQ=' 'sha256-aqNNdDLnnrDOnTNdkJpYlAxKVJtLt9CtFLklmInuUAE=' 'sha256-DYVT7t5s2ICMBLN6Jw1VQT7HOWV4aCTSonlEix6I/R8=' 'sha256-kvc78SQn7iP+g9s8uphw7CyzQyiDsk0JrXkT1U9+sCo=';`
      )
      res.setHeader('X-XSS-Protection', '0')
      next()
    })

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

    server.all('*', (req, res) => {
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
