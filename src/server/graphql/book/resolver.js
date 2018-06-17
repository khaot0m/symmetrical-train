const books = require('../../dummy-data/book.js');

exports.resolver = {
  Query: {
    books: () => books,
  },
    Mutation: {
        createBook: (parent, args, context, info) => {
            books.push(args);
            return args;
        }
    }
};

