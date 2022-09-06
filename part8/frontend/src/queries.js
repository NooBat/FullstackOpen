import { gql } from '@apollo/client';

export const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!, $born: Int) {
    addAuthor(name: $name, born: $born) {
      name
      bookCount
      born
      id
    }
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
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      bookCount
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query ME {
    me {
      username
      favoriteGenre
    }
  }
`;
