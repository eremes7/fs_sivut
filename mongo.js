const mongoose = require('mongoose')


const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  }
})

const Person = mongoose.model('Person', personSchema)


