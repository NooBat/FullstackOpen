require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI.toString();
const PORT = process.env.PORT.toString();

module.exports = { MONGODB_URI, PORT };
