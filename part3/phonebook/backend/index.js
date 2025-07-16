const express = require('express')
const morgan = require('morgan')
const Person = require('./models/node.js')

const tiny = ':method :url :status :res[content-length] - :response-time ms'
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(`${tiny} :body`))
app.use(express.static('dist'))

let persons = [] 

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => {
    console.log('Error retrieving persons:', error.message)
    response.status(500).json({ error: 'internal server error' })
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const now = new Date()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${now}</p>  
    `)
  })
  .catch(error => {
    console.log('Error retrieving info:', error.message)
    response.status(500).json({ error: 'internal server error' })
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    person 
      ? response.json(person) 
      : response.status(404).send(`ERROR: A person under ID: ${id} was already deleted`)
  })
  .catch(error => {
    console.log('Error retrieving a person by id:', error.message)
    response.status(500).json({ error: 'internal server error' })
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000000).toString()
  } while (persons.find(p => p.id === id))
  return id
}

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: "name or number is missing"
    })
  }

  if (persons.find(p => p.name === name)){
   return response.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    id: generateId(),
    name,
    number
  }
  persons.push(person)
  
  response.status(201).json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})