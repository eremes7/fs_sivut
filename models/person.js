const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        console.log('Yhdistetty MongoDB')
    })
    .catch((error) => {
        console.log('Virhe yhdistäessä tietokantaan:', error.message)
    })

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
      

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)