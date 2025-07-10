const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

const tiny = ':method :url :status :res[content-length] - :response-time ms'
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(`${tiny} :body`))

app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] 

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const length = persons.length
  const now = new Date()
  response.send(`
    <p>Phonebook has info for ${length} people</p>
    <p>${now}</p>  
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  console.log(person)
  person ? response.json(person) : response.status(404).send(`ERROR: A person under ID: ${id} was already deleted`)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})