const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const listHelper = require('./bloglists_for_testing')

const api = supertest(app)

describe('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('GET /api/blogs', () => {
    test('blogs are returned as JSON', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('retrieves all blogs', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('id property of a blog is named correctly', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      assert.strictEqual(typeof blogToView.id, 'string')
      assert.strictEqual(blogToView._id, undefined)
    })

    test('retrieves correct blog with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const result = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(result.body, blogToView)
    })

    test('returns 404 when blog doesn\'t exist with a valid id', async () => {
      const validNonexistingId = await helper.generateNonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('returns 400 when id is invalid', async () => {
      const invalidId = '5a422a851b54a676234d17f790125ga798'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('POST /api/blogs', () => {
    test('returns 201 when a valid blog is successfully added', async () => {
      const blogToAdd = listHelper.listWithOneBlogClean[0]

      await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const blogIsPresent = blogsAtEnd.some(blog =>
        blog.title === blogToAdd.title &&
        blog.author === blogToAdd.author &&
        blog.url === blogToAdd.url &&
        blog.likes === blogToAdd.likes
      )
      assert.strictEqual(true, blogIsPresent)
    })

    test('blog\'s likes property defaults to 0 when it\'s missing and successfully adds with 201', async () => {
      const blogToAdd = listHelper.listWithOneBlogWithoutLikesPropertyClean[0]

      await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogToView = blogsAtEnd.find(blog =>
        blog.title === blogToAdd.title &&
        blog.author === blogToAdd.author &&
        blog.url === blogToAdd.url
      )

      assert.strictEqual(blogToView.likes, 0)
    })

    test('returns 400 Bad Request when title property is missing', async () => {
      const blogToAdd = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 5
      }

      const response = await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'missing title')

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('returns 400 Bad Request when url property is missing', async () => {
      const blogToAdd = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 5
      }

      const response = await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'missing url')

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('DELETE /api/blogs/:id', () => {
    test('returns 204 when blog is successfully deleted with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const blogToView = blogsAtEnd.some(blog => blog.id === blogToDelete.id)
      assert.strictEqual(blogToView, false)
    })

    test('returns 404 when blog doesn\'t exist', async () => {
      const validNonexistingId = await helper.generateNonExistingId()

      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('returns 400 when id is invalid', async () => {
      const invalidId = '5a422a851b54a676234d17f790125ga798'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('updates blog successfully with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedData = {
        title: 'TDD harms architecture',
        author: 'Yuval Noah Harari',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 189
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogToView = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

      assert.deepStrictEqual(response.body, blogToView)
    })

    test('updates successfully only the likes property of a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedLikes = { likes: blogToUpdate.likes + 1 }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })

    test('returns 404 when blog doesn\'t exist', async () => {
      const validNonexistingId = await helper.generateNonExistingId()

      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('returns 400 when id is invalid', async () => {
      const invalidId = '5a422a851b54a676234d17f790125ga798'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})