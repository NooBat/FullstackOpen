"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const fs_1 = require("fs");
const schema_1 = require("@graphql-tools/schema");
const typeDefs = (0, fs_1.readFileSync)(`${__dirname}/graphql/schema.graphql`, {
    encoding: 'utf-8',
});
const resolvers = {
    Query: {
        helloWorld: () => 'Hello World',
        currentUser: (_root, _args, context) => context.getUser(),
    },
    Mutation: {
        sessionLogout: (_root, _args, context) => {
            context.logout();
        },
    },
};
exports.schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
