const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const glue = require('schemaglue');

const models = require('./models/index');

const { schema, resolver } = glue('src/server/graphql');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  formatParams: (params) => {
    console.log(params);
    return params;
  },
  formatError: (error) => {
    console.log(error);
    return error;
  },
  formatResponse: (response) => {
    console.log(response);
    return response;
  },
  context: { models }
});

mongoose.connect('mongodb://127.0.0.1/books');

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
