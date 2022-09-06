require('dotenv').config();
const {
  ApolloServer,
  gql,
  AuthorizationError,
  UserInputError,
} = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

console.log('connecting to MongoDB', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.error('error connecting to MongoDB:', err.message);
  });

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821,
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//   },
// ];

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns'],
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design'],
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime'],
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution'],
//   },
// ];

const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  }
`;

const resolvers = {
  Query: {
    allAuthors: async () => Author.find({}),
    allBooks: async (_, args) => {
      const author = await Author.findOne({ name: args.author });

      if (!author && !args.genre) {
        return Book.find({}).populate('author');
      } else if (!args.genre) {
        return Book.find({ author: author._id }).populate('author');
      } else if (!author) {
        return Book.find({ genres: { $all: args.genre } }).populate('author');
      }
      return Book.find({
        author: author._id,
        genres: {
          $all: [...args.genre],
        },
      }).populate('author');
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (_, __, context) => context.currentUser,
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });

      return (await Book.find({ author: author._id })).length;
    },
  },

  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthorizationError('not authenticated');
      }

      const book = await Book.findOne({ title: args.title });
      if (book) {
        throw new UserInputError('book already exist', {
          invalidArgs: args.title,
        });
      }

      const newBook = new Book({ ...args });
      const author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        });
        newBook.author = newAuthor._id;
        try {
          await newAuthor.save();
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          });
        }
      } else {
        newBook.author = author._id;
      }

      try {
        await (await newBook.save()).populate('author');
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      console.log(newBook);

      return newBook;
    },
    createUser: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (user) {
        throw new UserInputError('username must be unique', {
          invalidArgs: args.username,
        });
      }

      const passwordHash = await bcrypt.hash(
        args.password,
        Number(process.env.SALT_ROUNDS)
      );

      const newUser = new User({
        username: args.username,
        passwordHash,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await newUser.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      return newUser;
    },
    editAuthor: async (_, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name });

      if (!currentUser) {
        throw new AuthorizationError('not authenticated');
      }

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      const isCorrectPassword = user
        ? await bcrypt.compare(args.password, user.passwordHash)
        : false;

      if (!user || !isCorrectPassword) {
        throw new UserInputError('wrong credentials', {
          invalidArgs: args,
        });
      }

      const userForToken = {
        id: user._id,
        username: user.username,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }

    return null;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
