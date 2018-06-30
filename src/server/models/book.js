const mongoose = require('mongoose');

const { Schema } = mongoose;

const book = new Schema({
  title: String,
  author: String
});
const BookModel = mongoose.model('BookModel', book);

module.exports = BookModel;
