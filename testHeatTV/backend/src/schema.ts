import { readFileSync } from 'fs';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers } from '@graphql-tools/utils';

import { Context } from './types';

const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, {
  encoding: 'utf-8',
});

const resolvers: IResolvers = {
  Query: {
    helloWorld: (): string => 'Hello World',
    currentUser: (_root, _args, context: Context) => context.getUser(),
  },
  Mutation: {
    sessionLogout: (_root, _args, context: Context) => {
      context.logout();
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
