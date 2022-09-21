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

  type Mutation {
    "Mutation to increase a Track's views"
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
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
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The track's full duration, in seconds"
    durationInSeconds: Int!
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
    "The Module's content"
    content: String!
    "The Module's title"
    title: String!
    "The Module's length in minutes"
    length: Int! @deprecated(reason: "Use durationInSeconds")
    "The Module's video duration, in seconds"
    durationInSeconds: Int!
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
