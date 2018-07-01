const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const glue = require('schemaglue');
const auth = require('./middleware/authorization');
const models = require('./models/index');

const { schema, resolver } = glue('src/server/graphql');
const app = express();


if (process.env.NODE_ENV === 'development') {
  dotEnv.config({ path: './development.env' });
}

const apolloServer = new ApolloServer({
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
  context: { models },
  SubscriptionServerOptions: {
    path: 'ws://127.0.0.1:4000'
  }
});

mongoose.connect(process.env.DATABASE_URL);

app.use(auth);
apolloServer.applyMiddleware({ app });


const expressServer = app.listen(process.env.PORT, () => {
  console.log(`🚀  Server ready at ${expressServer.address().port}`);
});

