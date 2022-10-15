import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query getAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query getBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id
      title
      published
      author {
        name
      }
    }
  }
`;

export const ALL_GENRES = gql`
  query getGenres {
    allGenres
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      code
      success
      message
      book {
        id
        title
        published
        author {
          id
          name
          born
          bookCount
        }
        genres
      }
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      code
      success
      message
      author {
        id
        name
        born
        bookCount
      }
    }
  }
`;
