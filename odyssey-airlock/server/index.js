const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const { readFileSync } = require('fs');
const axios = require('axios');

const resolvers = require('./resolvers');
const {
  BookingsDataSource,
  ReviewsDataSource,
  ListingsAPI,
  AccountsAPI,
  PaymentsAPI,
} = require('./services');

const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookingsDb: new BookingsDataSource(),
    reviewsDb: new ReviewsDataSource(),
    listingsAPI: new ListingsAPI(),
    accountsAPI: new AccountsAPI(),
    paymentsAPI: new PaymentsAPI(),
  }),
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const userId = token.split(' ')[1]; // get the user name after 'Bearer '
    if (userId) {
      const { data } = await axios
        .get(`http://localhost:4011/login/${userId}`)
        .catch((error) => {
          throw new AuthenticationError(error.message);
        });

      return { userId: data.id, userRole: data.role };
    }

    return null;
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
