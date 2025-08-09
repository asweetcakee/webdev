const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const listHelper = require('./bloglists_for_testing')

const api = supertest(app)

describe('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    /* Creates one user */
    const user = helper.initialUsers[0]
    const hashedPassword = await helper.hashPassword(user.password)
    const userObj = new User({
      username: user.username,
      name: user.name,
      passwordHash: hashedPassword
    })
    await userObj.save()

    /* Assigns each blog the same user */
    for (let blog of helper.initialBlogs) {
      const blogObj = new Blog({
        ...blog,
        user: userObj._id
      })
      await blogObj.save()
    }
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
    test('returns 201 when a new blog with a valid token is successfully created', async () => {
      const blogToAdd = listHelper.listWithMoreThanOneBlogClean[0]
      const userToAssign = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToAssign)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const blogIsPresent = blogsAtEnd.some(blog =>
        blog.title === blogToAdd.title &&
        blog.author === blogToAdd.author &&
        blog.url === blogToAdd.url &&
        blog.user.toString() === userToAssign.id &&
        blog.likes === blogToAdd.likes
      )
      assert.strictEqual(true, blogIsPresent)
    })

    test('blog\'s likes property defaults to 0 when it\'s missing and successfully adds with 201', async () => {
      const blogToAdd = listHelper.listWithOneBlogWithoutLikesPropertyClean[0]
      const userToAssign = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToAssign)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogToView = blogsAtEnd.find(blog =>
        blog.title === blogToAdd.title &&
        blog.author === blogToAdd.author &&
        blog.user.toString() === userToAssign.id &&
        blog.url === blogToAdd.url
      )

      assert.strictEqual(blogToView.likes, 0)
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('returns 401 when blog is created under unauthorized token', async () => {
      const blogToAdd = listHelper.listWithMoreThanOneBlogClean[0]
      const unauthorizedToken = await helper.generateNonExistingToken()
      const blogsAtStart = await helper.blogsInDb()

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${unauthorizedToken}`)
        .send(blogToAdd)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('returns 401 when token is missing', async () => {
      const blogToAdd = listHelper.listWithMoreThanOneBlogClean[0]
      const blogsAtStart = await helper.blogsInDb()

      await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })

    test('returns 400 Bad Request when title property is missing', async () => {
      const blogToAdd = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 5
      }

      const userToAssign = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToAssign)

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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

      const userToAssign = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToAssign)

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogToAdd)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'missing url')

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('DELETE /api/blogs/:id', () => {
    test('returns 204 when blog is successfully deleted with a valid id and token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const userToView = await helper.getFirstUserFromDb()
      assert.strictEqual(blogToDelete.user.toString(), userToView.id)

      const token = await helper.loginAndGetToken(api, userToView)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const isBlogStillPresent = blogsAtEnd.some(blog => blog.id === blogToDelete.id)
      assert.strictEqual(isBlogStillPresent, false)
    })

    test('returns 401 when blog is deleted under an unauthorized token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const unauthorizedToken = await helper.generateNonExistingToken()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${unauthorizedToken}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('returns 401 when no token is provided', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('returns 404 when blog doesn\'t exist', async () => {
      const validNonexistingId = await helper.generateNonExistingId()
      const userToView = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToView)
      const blogsAtStart = await helper.blogsInDb()

      const response = await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'blog not found')

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('returns 400 when id is invalid', async () => {
      const invalidId = '5a422a851b54a676234d17f790125ga798'
      const userToView = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToView)

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('updates blog successfully with a valid id and token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const userToView = await helper.getFirstUserFromDb()
      assert.strictEqual(blogToUpdate.user.toString(), userToView.id)

      const token = await helper.loginAndGetToken(api, userToView)

      const updatedData = {
        title: 'TDD harms architecture',
        author: 'Yuval Noah Harari',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 189
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const isBlogPresent = blogsAtEnd.some(blog => blog.id === blogToUpdate.id)

      assert.strictEqual(response.body.id, blogToUpdate.id)
      assert.strictEqual(response.body.title, updatedData.title)
      assert.strictEqual(response.body.author, updatedData.author)
      assert.strictEqual(response.body.url, updatedData.url)
      assert.strictEqual(response.body.likes, updatedData.likes)
      assert(isBlogPresent)
    })

    test('updates successfully only the likes property of a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const userToView = await helper.getFirstUserFromDb()
      assert.strictEqual(blogToUpdate.user.toString(), userToView.id)

      const token = await helper.loginAndGetToken(api, userToView)

      const updatedLikes = { likes: blogToUpdate.likes + 1 }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })

    test('returns 401 when blog is updated under an unauthorized token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const unauthorizedToken = await helper.generateNonExistingToken()

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${unauthorizedToken}`)
        .send(blogToUpdate)
        .expect(401)
    })

    test('returns 401 when token is missing', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedData = { likes: blogToUpdate.likes + 1 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(401)
    })

    test('returns 404 when blog doesn\'t exist', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const validNonexistingId = await helper.generateNonExistingId()
      const userToView = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToView)

      const response = await api
        .put(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(blogToUpdate)
        .expect(404)

      assert.strictEqual(response.body.error, 'blog doesn\'t exist')
    })

    test('returns 400 when id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const invalidId = '5a422a851b54a676234d17f790125ga798'
      const userToView = await helper.getFirstUserFromDb()
      const token = await helper.loginAndGetToken(api, userToView)

      await api
        .put(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(blogToUpdate)
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})