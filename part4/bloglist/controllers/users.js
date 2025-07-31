const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const MAGIC_NUMBERS = {
  saltRounds: 10
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) return response.status(400).json({ error: 'username and password are required' })

  const hashedPass = await bcrypt.hash(password, MAGIC_NUMBERS.saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash: hashedPass
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter