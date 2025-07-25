const Blog = require('../models/blog')
const initialBlogs = require('./bloglists_for_testing').listWithMoreThanOneBlog

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
