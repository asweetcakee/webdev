const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('Users API', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    for (let user of helper.initialUsers) {
      const hashedPassword = await helper.hashPassword(user.password)

      const userObj = new User({
        username: user.username,
        name: user.name,
        passwordHash: hashedPassword
      })

      await userObj.save()
    }
  })

  describe('GET /api/users', () => {
    test('users are returned as JSON', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns all users', async () => {
      const response = await api.get('/api/users')
      assert.strictEqual(response.body.length, helper.initialUsers.length)
    })

    test('hashed password or regular password are not returned', async () => {
      const usersAtStart = await helper.usersInDb()
      const userToView = usersAtStart[0]

      assert.strictEqual(userToView.passwordHash, undefined)
      assert.strictEqual(userToView.password, undefined)
    })

    test('id property of a user is named correctly', async () => {
      const usersAtStart = await helper.usersInDb()
      const userToView = usersAtStart[0]

      assert.strictEqual(typeof userToView.id, 'string')
      assert.strictEqual(userToView._id, undefined)
    })

    test('__v property of a user is not displayed', async () => {
      const usersAtStart = await helper.usersInDb()
      const userToView = usersAtStart[0]

      assert.strictEqual(userToView.__v, undefined)
    })
  })

  describe('POST /api/users', () => {
    test('successfully creates a valid user with the 201 code', async () => {
      const newUser = {
        username: 'test_user',
        name: 'test',
        password: 'test'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      const usernames = usersAtEnd.map(user => user.username)

      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
      assert(usernames.includes(newUser.username), 'New user must exist in DB')
    })

    test('successfully hashes password', async () => {
      const newUser = {
        username: 'test_user',
        name: 'test',
        password: 'test'
      }

      await api.post('/api/users').send(newUser).expect(201)

      const userInDb = await User.findOne({ username: newUser.username })
      const isMatch = await bcrypt.compare(newUser.password, userInDb.passwordHash)
      assert(isMatch, 'Hashed password should match original')
    })

    test('fails when username is not unique with the 400 code', async () => {
      const newUser = {
        username: 'root',
        name: 'test',
        password: 'test'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

      assert(response.body.error.includes('expected `username` to be unique'))
    })

    test('fails when username is missing with the 400 code', async () => {
      const newUser = {
        name: 'test',
        password: 'test'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error.match(/username.*password.*required/i))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })

    test('fails when password is missing with the 400 code', async () => {
      const newUser = {
        username: 'test',
        name: 'test'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error.match(/username.*password.*required/i))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })

    test('fails when username length is less than 3 characters with the 400 code', async () => {
      const newUser = {
        username: 'te',
        name: 'test',
        password: 'test'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error.match(/username.*password.*at least 3 characters long/i))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })

    test('fails when password length is less than 3 characters with the 400 code', async () => {
      const newUser = {
        username: 'test',
        name: 'test',
        password: 'te'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error.match(/username.*password.*at least 3 characters long/i))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})