const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
  ,
  username: {
    required: [true, 'username is required'],
    type: String,
    unique: true
  },
  name: String,
  passwordHash: {
    required: [true, 'password is required'],
    type: String
  }
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.passwordHash
    delete returnedObj.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User