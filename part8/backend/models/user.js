const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 5,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3,
  },
});

module.exports = mongoose.model('User', userSchema);
