const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', schema);
