const { PubSub } = require('apollo-server');

const pubSub = new PubSub();
const books = require('../../dummy-data/book.js');

const BOOK_ADDED = 'BOOK_ADDED';
exports.resolver = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook: (parent, args, context, info) => {
      books.push(args);
      pubSub.publish(BOOK_ADDED, { bookCreated: args });
      return args;
    }
  },
  Subscription: {
    bookCreated: {
      subscribe: () => {
        console.log('SUBSCRIBING');
        return pubSub.asyncIterator([BOOK_ADDED]);
      }
    },
  },
};

