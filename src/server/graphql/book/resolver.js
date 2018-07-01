const { PubSub } = require('apollo-server-express');

const pubSub = new PubSub();

const BOOK_ADDED = 'BOOK_ADDED';
const USER_ADDED = 'USER_ADDED';
exports.resolver = {
  Query: {
    books: (parent, args, context, info) => new Promise((resolve, reject) => {
      context.models.Book.find({}, (err, books) => {
        if (err) {
          reject(err);
        }
        resolve(books);
      });
    }),
    users: (parent, args, context, info) => new Promise((resolve, reject) => {
      context.models.User.find({}, (err, users) => {
        if (err) {
          reject(err);
        }
        resolve(users);
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
    }),
    createUser: (parent, args, context, info) => new Promise((resolve, reject) => {
      context.models.User.create(args, (err, user) => {
        if (err) {
          reject(err);
        }
        pubSub.publish(USER_ADDED, { userCreated: args });
        resolve(user);
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
    userCreated: {
      subscribe: () => {
        console.log('SUBSCRIBING');
        return pubSub.asyncIterator([USER_ADDED]);
      }
    },
  }
};
