const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const listHelper = require('./bloglists_for_testing')

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get() retrieves all blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id property of a blog is named correctly', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]

  assert.strictEqual(typeof blog.id, 'string')
  assert.strictEqual(blog._id, undefined)
})

test('post() adds a valid blog correctly', async () => {
  const newBlog = listHelper.listWithOneBlogClean[0]

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1)

  const isBlogsContentAdded = updatedBlogs.some(blog =>
    blog.title === newBlog.title &&
    blog.author === newBlog.author &&
    blog.url === newBlog.url &&
    blog.likes === newBlog.likes
  )
  assert.strictEqual(true, isBlogsContentAdded)
})

test.only('blog\'s likes property is handled correctly when post() adds a new blog', async () => {
  const newBlog = listHelper.listWithOneBlogWithoutLikesPropertyClean[0]

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  const addedBlog = updatedBlogs.find(blog => blog.title === newBlog.title)

  assert.strictEqual(addedBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})