var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//require('../models/Projects');
var Projects = mongoose.model('Projects');

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../../src/schemas/schemaHome';
import resolvers from '../../src/resolvers/resolversHome';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

router.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    Projects
  }
}))

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

module.exports = router;