const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = require('./bloglists_for_testing').listWithMoreThanOneBlogClean
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

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

const getFirstUserFromDb = async () => {
  const users = await usersInDb()
  const dbUser = users[0]

  const rawUser = initialUsers.find(user => user.username === dbUser.username)

  return {
    ...dbUser,
    password: rawUser.password
  }
}

const loginAndGetToken = async (api, user = initialUsers[0]) => {
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })
  return loginResponse.body.token
}

const generateNonExistingToken = async () => {
  const fakeId = new mongoose.Types.ObjectId()

  const token = jwt.sign({
    username: 'nonExisting',
    id: fakeId.toString()
  },
  process.env.TOKEN_SECRET)

  return token
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  generateNonExistingId,
  hashPassword,
  getFirstUserFromDb,
  loginAndGetToken,
  generateNonExistingToken
}
