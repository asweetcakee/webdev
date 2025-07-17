const express = require('express')
const morgan = require('morgan')
const Person = require('./models/node.js')

const tiny = ':method :url :status :res[content-length] - :response-time ms'
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(`${tiny} :body`))


let persons = [] 

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {
    const now = new Date()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${now}</p>  
    `)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    person 
      ? response.json(person) 
      : response.status(404).send(`ERROR: A person under ID: ${id} was already deleted`)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name: newName, number: newNumber } = request.body

  if (!newName || !newNumber) {
    return response.status(400).json({
      error: "name or number is missing"
    })
  }

  // if (persons.find(p => p.name === name)){
  //  return response.status(400).json({
  //     error: "name must be unique"
  //   })
  // }

  const person = new Person({
    name: newName,
    number: newNumber
  })
  
  person.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError'){ 
    return response.status(400).json({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})