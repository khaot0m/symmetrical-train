const { PubSub } = require('apollo-server');

const pubSub = new PubSub();

const BOOK_ADDED = 'BOOK_ADDED';
exports.resolver = {
  Query: {
    books: (parent, args, context, info) => new Promise((resolve, reject) => {
      context.models.Book.find({}, (err, books) => {
        if (err) {
          reject(err);
        }
        resolve(books);
      });
    })
  },
  Mutation: {
    createBook: (parent, args, context, info) => new Promise((resolve, reject) => {
      context.models.Book.create(args, (err, book) => {
        if (err) {
          reject(err);
        }
        pubSub.publish(BOOK_ADDED, { bookCreated: args });
        resolve(book);
      });
    })

  },
  Subscription: {
    bookCreated: {
      subscribe: () => {
        console.log('SUBSCRIBING');
        return pubSub.asyncIterator([BOOK_ADDED]);
      }
    },
  }
};
