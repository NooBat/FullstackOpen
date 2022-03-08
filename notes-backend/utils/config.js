require('dotenv').config();

const PORT = process.env.PORT.toString();
const MONGODB_URI = process.env.MONGODB_URI.toString();

module.exports = {
  MONGODB_URI,
  PORT,
};
