const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = require('./bloglists_for_testing').listWithMoreThanOneBlogClean

const initialUsers = [
  {
    username: 'root',
    name: 'superclass',
    password: 'admin'
  },
  {
    username: 'matt',
    name: 'Matias',
    password: 'mypass123'
  },
  {
    username: 'tokyo',
    name: 'Thomas Devismes',
    password: 'random123'
  }
]

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const generateNonExistingId = async () => {
  const blog = new Blog ({ title: 'toDelete' })
  await blog.save()
  await blog.deleteOne()

  return blog._id
}

const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10)
  return hashedPass
}

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, generateNonExistingId, hashPassword }
