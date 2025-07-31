/* 1 */
const morgan = require('morgan')
const tiny = ':method :url :status :res[content-length] - :response-time ms'

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

let httpLogger = (req, res, next) => next()

if (process.env.NODE_ENV !== 'test') {
  morgan(`${tiny} :body`)
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
  }

  next(error)
}

module.exports = { httpLogger, unknownEndpoint, errorHandler }