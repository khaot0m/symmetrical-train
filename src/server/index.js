const { ApolloServer } = require('apollo-server');

const glue = require('schemaglue');

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
});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
