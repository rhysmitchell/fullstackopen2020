/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Contact = require('./models/contact')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const params = {
  password: process.argv[2],
  name: process.argv[3],
  number: process.argv[4],
}

if (!params.name && !params.number) {
  Contact.find({}).then((contacts) => {
    contacts.map((contact) => console.log(`${contact.name} ${contact.number}`))

    mongoose.connection.close()
  })

  // Short circuit
  return
}

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
  id: 99999,
})

contact.save().then((result) => {
  console.log(
    `Added ${result.name}'s phone number (${result.number}) to the phonebook.`
  )
  mongoose.connection.close()
})
