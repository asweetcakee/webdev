require('dotenv').config();
const mongoose = require('mongoose')

const [, , password, newName, newNumber] = process.argv
const baseUrl = process.env.MONGODB_URI
const userName = process.env.USER_NAME

const finalUrl = baseUrl.replace('<USERNAME>', userName).replace('<PASSWORD>', password)
//console.log("-URL:", finalUrl)

mongoose.set('strictQuery', false)

mongoose.connect(finalUrl)
  .then(() => {
    const phonebookSchema = new mongoose.Schema({
      name: String,
      number: String
    })

    const Person = mongoose.model('Person', phonebookSchema)

    if (!newName && !newNumber) {
      console.log('phonebook:')
      return Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
      })
    } else {
      const person = new Person({
        name: newName,
        number: newNumber
      })

      return person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
      })
    }
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch(error => {
    console.log('Error connecting to MongoDB, error:', error.message)
    process.exit(1)
  })









