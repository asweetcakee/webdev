const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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

module.exports = blogsRouter