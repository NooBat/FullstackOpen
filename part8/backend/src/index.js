const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');
const User = require('./models/User');

console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.startsWith('Bearer ')) {
      const token = auth.substring(7);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      return {
        currentUser: await User.findById(decodedToken.id),
      };
    }

    return null;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
