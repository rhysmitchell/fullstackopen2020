const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)


const contactSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 },
  id: Number,
})

const uniqueValidator = require('mongoose-unique-validator')
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)