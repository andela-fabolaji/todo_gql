const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const typeDefs = path.resolve(__dirname, './schema.graphql');
const resolvers = require('./resolvers');
const { prisma } = require('./prisma-client');

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
});

server.start(({ port }) => {
  console.log(`Server provisioned on http://localhost:${port}`);
});