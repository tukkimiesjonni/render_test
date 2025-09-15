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

const personSchema = new mongoose.Schema({
name: String,
number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    const url = `mongodb+srv://jonnitukkimies:${password}@cluster0.f4jjywz.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
    // TBD

}

if (process.argv.length == 5) {
    const url = `mongodb+srv://jonnitukkimies:${password}@cluster0.f4jjywz.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url)
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
