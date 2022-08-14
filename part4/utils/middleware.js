const jwt = require('jsonwebtoken');
const User = require('../models/user');

const logger = require('./logger');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (!token) {
    next({ name: 'JsonWebTokenError', message: 'unauthorized' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    request.user = null;
  } else {
    request.user = await User.findById(decodedToken.id);
  }

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'JSONWebTokenError') {
    return response.status(401).send({ error: 'invalid token' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'unauthorized' });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
