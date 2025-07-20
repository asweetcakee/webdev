require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const baseUrl = process.env.MONGODB_URI
const userName = process.env.USER_NAME
const password = process.env.PASSWORD

const finalUrl = baseUrl.replace('<USERNAME>', userName).replace('<PASSWORD>', password)

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length >= 3
      },
      message: props => `(${props.value}) must be at least 3 characters long`
    },
    required: [true, 'Name is required']
  },
  number: String
})

console.log('Connecting to', finalUrl)
mongoose.connect(finalUrl).then(result => {
  console.log('Connected to MongoDB.')
})
.catch(error => {
  console.log('Error connecting to MongoDB, error:', error.message)
  process.exit(1)
})

phonebookSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj.__v
    delete returnedObj._id
  }
})

module.exports = mongoose.model('Person', phonebookSchema)


