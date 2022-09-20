const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    tracksForHomepage: [Track!]!
    "Query to fetch a specific Track, provided a Track's ID"
    track(id: ID!): Track
    "Query to fetch a specific Module, provided a Module's ID"
    module(id: ID!): Module
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The Track's title"
    title: String!
    "The Track's main Author"
    author: Author!
    "The Track's main illustration to display in track card or track page detail"
    thumbnail: String
    "The Track's approximate length to complete, in minutes"
    length: Int
    "the number of Modules this Track contains"
    modulesCount: Int
    "The Track's complete description, can be in Markdown format"
    description: String
    "the number of times a Track has been viewed"
    numberOfViews: Int
    "The Track's complete list of Modules"
    modules: [Module!]!
  }

  "A Module is a single unit of teaching. Multiple Modules compose a track"
  type Module {
    id: ID!
    "The Module's title"
    title: String!
    "The Module's length in minutes"
    length: Int!
    "The Module's video URL"
    videoUrl: String!
  }

  "Author of a complete Track"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String
  }
`;

module.exports = typeDefs;