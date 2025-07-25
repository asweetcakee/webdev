require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const USERNAME = process.env.USER_NAME
const PASS_ENCODED = process.env.PASSWORD_ENCODED
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT

module.exports = { MONGODB_URI, USERNAME, PASS_ENCODED, PASSWORD, PORT }