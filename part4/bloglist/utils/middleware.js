const jwt = require('jsonwebtoken')
const User = require('../models/user')

/* 1 */
const morgan = require('morgan')
const tiny = ':method :url :status :res[content-length] - :response-time ms'

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

let httpLogger = (req, res, next) => next()

if (process.env.NODE_ENV !== 'test') {
  httpLogger = morgan(`${tiny} :body`)
}

/* 2 */
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

/* 3 */
const errorHandler = (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if ([
    'token is missing',
    'invalid token',
    'no user to assign'
  ].includes(error.message)) {
    return res
      .status(401)
      .json({ error: error.message })
  }
  next(error)
}

/* 4 */
const tokenExtractor = (req, res, next) => {
  const magic_string = 'bearer '
  const auth = req.get('authorization') || ''
  req.token = auth.toLowerCase().startsWith(magic_string)
    ? auth.slice(magic_string.length).trim()
    : null

  next()
}

/* 5 */
const userExtractor = async (req, res, next) => {
  const token = req.token
  if (!token) throw new Error('token is missing')

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if (!decodedToken.id) throw new Error('invalid token')

  const user = await User.findById(decodedToken.id)
  if (!user) throw new Error('no user to assign')

  req.user = user
  next()
}

module.exports = { httpLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }