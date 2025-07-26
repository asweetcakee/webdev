const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const blog = await Blog.findById(id)

  if (blog) {
    return response.json(blog)
  } else {
    return response.status(404).json({ error: 'blog doesn\'t exist' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'missing title or url' })
  }

  const blogData = {
    ...request.body,
    likes: likes !== undefined && likes !== null ? likes : 0
  }

  const blog = new Blog(blogData)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const blogIsPresent = await Blog.findById(id)

  if (!blogIsPresent) return response.status(404).json({ error: 'blog not found' })

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter