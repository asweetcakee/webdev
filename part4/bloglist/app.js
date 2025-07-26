const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRoutes = require('./controllers/blogs')

const app = express()

const URL = config.MONGODB_URI
  .replace('<USERNAME>', config.USERNAME)
  .replace('<PASSWORD>', config.PASS_ENCODED)
logger.info(`Connecting to ${URL}`)

mongoose.connect(URL)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(middleware.httpLogger)
}

app.use('/api/blogs', blogRoutes)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
