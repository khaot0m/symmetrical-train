const books = require('../../dummy-data/book.js');

exports.resolver = {
  Query: {
    books: () => books,
  }
};
