import { readFileSync } from 'fs';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers } from '@graphql-tools/utils';

const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, {
  encoding: 'utf-8',
});

const resolvers: IResolvers = {
  Query: {
    helloWorld: (): string => 'Hello World',
    currentUser: (_root, _args, context) => {
      console.log(context.getSession(), 'in resolver');
      console.log(context.getUser());
      return context.getUser();
    },
  },
  Mutation: {
    sessionLogin: (_root, _args, context) => {
      context.logout();
      return 'logged out';
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
