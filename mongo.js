const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log('add a new contact in this form (node mongo.js password name number)')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://jonnitukkimies:${password}@cluster0.f4jjywz.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 1,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length == 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log('Added', name, 'Number', number, 'to Phonebook')
    mongoose.connection.close()
  })
}
