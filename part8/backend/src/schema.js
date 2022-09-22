const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to fetch the number of Books"
    bookCount: Int!
    "Query to fetch the number of Authors"
    authorCount: Int!
    "Query to fetch all Books"
    allBooks(author: String, genre: String): [Book!]!
    "Query to fetch all Authors"
    allAuthors: [Author!]!
  }

  type Mutation {
    "Add a new Book"
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    "Edit the birth year of an Author"
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  "A Book"
  type Book {
    id: ID!
    "Title of the Book"
    title: String!
    "The published year of the Book"
    published: Int!
    "The Author of the Book"
    author: Author!
    "The Book's genres"
    genres: [String!]!
  }

  "An Author is the writer of Books. Each Author can have multiple Books"
  type Author {
    id: ID!
    "The Author's name"
    name: String!
    "The Author's birth year"
    born: Int
    "The Author's number of written books"
    bookCount: Int!
  }
`;

module.exports = typeDefs;
