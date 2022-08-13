const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

logger.info('connecting to:', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Unable to connect to MongoDB:', err.message);
  });

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  morgan.token('req-content', (request) => JSON.stringify(request.body));
  app.use(
    morgan(
      `
Method: :method
Path: :url
Status: :status
Response: :res-content
Response Length: :res[content-length]
Response time: :response-time ms
Content: :req-content
-------------------------------------
      `
    )
  );
}

app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
