const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const blog = await Blog
    .findById(id)
    .populate('user', { username: 1, name: 1, id: 1 })

  if (blog) {
    return response.json(blog)
  } else {
    return response.status(404).json({ error: 'blog doesn\'t exist' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body

  const token = request.token
  if (!token) return response.status(401).json({ error: 'token is missing' })

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'invalid token' })

  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(400).json({ error: 'no user to assign' })
  if (!title) return response.status(400).json({ error: 'missing title' })
  else if (!url) return response.status(400).json({ error: 'missing url' })

  const blog = new Blog({
    ...request.body,
    user: user._id,
    likes: likes !== undefined && likes !== null ? likes : 0
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const blogIsPresent = await Blog.findById(id)

  if (!blogIsPresent) return response.status(404).json({ error: 'blog not found' })

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const updatedBlog = { title, author, url, likes }
  const blogToUpdate = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true, runValidators: true })

  if (!blogToUpdate) return response.status(404).json({ error: 'blog doesn\'t exist' })

  response.json(blogToUpdate)
})

module.exports = blogsRouter