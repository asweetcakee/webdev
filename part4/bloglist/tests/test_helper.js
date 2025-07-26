const Blog = require('../models/blog')
const initialBlogs = require('./bloglists_for_testing').listWithMoreThanOneBlogClean

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const generateNonExistingId = async () => {
  const blog = new Blog ({ title: 'toDelete' })
  await blog.save()
  await blog.deleteOne()

  return blog._id
}

module.exports = { initialBlogs, blogsInDb, generateNonExistingId }
