const { PubSub } = require('graphql-subscriptions');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
require('dotenv').config();

const pubsub = new PubSub();

// const authors = [
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

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

// const books = [
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

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, { author, genre }) => {
      if (!author && !genre) {
        return Book.find({}).populate('author');
      } else if (!author) {
        return Book.find({ genres: { $in: [genre] } }).populate('author');
      }

      const selectedAuthor = await Author.findOne({ name: author });
      if (!selectedAuthor) {
        const newAuthor = Author({
          name: author,
          born: null,
        });

        await newAuthor.save();
      }

      return Book.find({
        author: selectedAuthor._id,
        genres: { $in: [genre] },
      }).populate('author');
    },
    allAuthors: async () => Author.find({}).populate('books'),
    allGenres: async () => {
      const books = await Book.find({});
      const dictionary = books.reduce((dict, book) => {
        book.genres.forEach((genre) => {
          if (!dict[genre]) {
            Object.assign(dict, { [genre]: 1 });
          }
        });

        return dict;
      }, {});

      return Object.keys(dictionary);
    },
    me: (_, __, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (
      _,
      { title, published, author, genres },
      { currentUser }
    ) => {
      if (!currentUser) {
        return {
          code: 403,
          success: false,
          message: 'Unauthorized',
          book: null,
        };
      }

      const newBook = {
        title,
        published,
        genres,
      };

      const selectedAuthor = await Author.findOne({ name: author });
      if (!selectedAuthor) {
        const newAuthor = Author({
          name: author,
          born: null,
        });

        try {
          await newAuthor.save();
          newBook.author = newAuthor;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: { author },
          });
        }
      } else {
        newBook.author = selectedAuthor;
      }
      const savedBook = Book(newBook);
      try {
        await savedBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { title, published, author, genres },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });

      return {
        code: 200,
        message: `${title} added successfully`,
        success: true,
        book: savedBook,
      };
    },
    editAuthor: async (_, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        return {
          code: 403,
          success: false,
          message: 'Unauthorized',
          author: null,
        };
      }

      const author = await Author.findOne({ name });

      if (author) {
        author.born = setBornTo;
      } else {
        return {
          code: 404,
          success: false,
          message: `author ${name} not found`,
          author: null,
        };
      }

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { setBornTo },
        });
      }

      return {
        code: 200,
        message: `author ${name} changed successfully`,
        success: true,
        author,
      };
    },
    createUser: async (_, { username, password, favouriteGenre }) => {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        throw new UserInputError('username already taken', {
          invalidArgs: { username },
        });
      }
      const saltRounds = await bcrypt.genSalt(process.env.SALT_ROUNDS);
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const newUser = User({
        username,
        passwordHash,
        favouriteGenre,
      });

      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { username, password, favouriteGenre },
        });
      }

      return newUser;
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      const isCorrectPassword =
        password && user
          ? await bcrypt.compare(password, user.passwordHash)
          : false;
      if (!isCorrectPassword) {
        throw new UserInputError('wrong credentials', {
          invalidArgs: { username, password },
        });
      }

      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET
      );

      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Author: {
    bookCount: async ({ books }) => books.length,
  },
};

module.exports = resolvers;
