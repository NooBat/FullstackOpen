const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

// const mocks = {
//   Query: () => ({
//     tracksForHomepage: () => [...new Array(6)],
//   }),
//   Track: () => ({
//     title: () => 'Astro Kitty, Space Explorer',
//     author: () => ({
//       name: 'Grumpy Cat',
//       photo:
//         'https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg',
//     }),
//     thumbnail: () =>
//       'https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg',
//     length: () => 1210,
//     modulesCount: () => 6,
//   }),
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ trackAPI: new TrackAPI() }),
});

server.listen({ port: process.env.PORT || 4000 }).then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `);
});
