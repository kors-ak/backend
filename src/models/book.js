const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  pubYear: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('book', bookSchema)
