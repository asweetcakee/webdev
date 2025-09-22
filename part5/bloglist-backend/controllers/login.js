const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!passwordCorrect) return response.status(400).json({ error: 'invalid user or password' })

  const userToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userToken, process.env.TOKEN_SECRET)

  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter