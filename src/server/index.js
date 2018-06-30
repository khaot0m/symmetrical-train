const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

const glue = require('schemaglue');

const models = require('./models/index');

const { schema, resolver } = glue('src/server/graphql');



if (process.env.NODE_ENV === 'development') {
  dotEnv.config({ path: './development.env' });
}
console.log(dotEnv, process.env.NODE_ENV);

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
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL);

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
