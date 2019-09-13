
const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
