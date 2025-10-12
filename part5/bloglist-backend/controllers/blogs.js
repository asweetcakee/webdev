const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body

  const user = request.user

  if (!title) return response.status(400).json({ error: 'missing title' })
  else if (!url) return response.status(400).json({ error: 'missing url' })

  const blog = new Blog({
    title,
    url,
    author,
    user: user._id,
    likes: likes ?? 0
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id

  const user = request.user

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const blogIsPresent = await Blog.findById(id)

  if (!blogIsPresent) return response.status(404).json({ error: 'blog not found' })

  if (blogIsPresent.user.toString() !== user.id) return response.status(401).json({ error: 'unauthorized delete attempt' })

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  if (!mongoose.isValidObjectId(id)) return response.status(400).json({ error: 'malformatted id' })

  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).json({ error: 'blog doesn\'t exist' })

  if (blog.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'unauthorized update attempt' })
  }

  const updatedBlog = { title, author, url, likes }
  const blogToUpdate = await Blog
    .findByIdAndUpdate(id, updatedBlog, { new: true, runValidators: true })
    .populate('user', { username: 1, name: 1 })

  response.json(blogToUpdate)
})

module.exports = blogsRouter