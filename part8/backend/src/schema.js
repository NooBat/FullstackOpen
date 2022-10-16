const { readFileSync } = require('fs');
const { gql } = require('apollo-server');

const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));

module.exports = typeDefs;
