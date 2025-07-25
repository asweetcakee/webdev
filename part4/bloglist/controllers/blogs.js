const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const likes = request.body.likes !== undefined && request.body.likes !== null
    ? request.body.likes
    : 0

  const blogData = {
    ...request.body,
    likes: likes
  }

  const blog = new Blog(blogData)
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter