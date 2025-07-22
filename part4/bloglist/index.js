require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

const tiny = ':method :url :status :res[content-length] - :response-time ms'

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const app = express()
app.use(morgan(`${tiny} :body`))

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const baseUrl = process.env.MONGODB_URI
const userName = process.env.USER_NAME
const password = process.env.PASSWORD_ENCODED

const mongoUrl = baseUrl.replace('<USERNAME>', userName).replace('<PASSWORD>', password)
mongoose.connect(mongoUrl)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})