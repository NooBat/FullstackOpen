const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require('apollo-server');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Person = require('./models/person');
const User = require('./models/user');

console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.error('error connecting to MongoDB:', e.message);
  });

// let persons = [
//   {
//     name: 'Arto Hellas',
//     phone: '040-123543',
//     street: 'Tapiolankatu 5 A',
//     city: 'Espoo',
//     id: '3d594650-3436-11e9-bc57-8b80ba54c431',
//   },
//   {
//     name: 'Matti Luukkainen',
//     phone: '040-432342',
//     street: 'Malminkaari 10 A',
//     city: 'Helsinki',
//     id: '3d599470-3436-11e9-bc57-8b80ba54c431',
//   },
//   {
//     name: 'Venla Ruuska',
//     street: 'Nallemäentie 22 C',
//     city: 'Helsinki',
//     id: '3d599471-3436-11e9-bc57-8b80ba54c431',
//   },
// ];

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User {
    username: String!
    passwordHash: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    addAsFriend(name: String!): User
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (_, args) => {
      if (!args.phone) {
        return Person.find({});
      }

      return Person.find({ phone: { $exist: args.phone === 'YES' } });
    },
    findPerson: async (_, args) => Person.findOne({ name: args.name }),
    me: async (_, __, context) => context.currentUser,
  },
  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city,
    }),
  },
  Mutation: {
    addPerson: async (_root, args, context) => {
      if (await Person.findOne({ name: args.name })) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        });
      }

      const person = new Person({ ...args });
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return person;
    },
    addAsFriend: async (_root, args, { currentUser }) => {
      const notFriendAlready = (person) =>
        !currentUser.friends
          .map((friend) => friend._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const person = await Person.findOne({ name: args.name });
      if (notFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }
      await currentUser.save();

      return currentUser;
    },
    editNumber: async (_root, args) => {
      const person = await Person.findOne({ name: args.name });

      if (!person) {
        return null;
      }

      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return person;
    },
    createUser: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (user) {
        throw new UserInputError('username already taken', {
          invalidArgs: args,
        });
      }

      const passwordHash = await bcrypt.hash(args.password, 10);

      const newUser = new User({
        username: args.username,
        passwordHash,
      });

      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return newUser;
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      const isCorrect = user
        ? await bcrypt.compare(args.password, user.passwordHash)
        : false;

      if (!user || !isCorrect) {
        throw new UserInputError('wrong credentials', {
          invalidArgs: args,
        });
      }

      return {
        value: jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET
        ),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      );

      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
