require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('./models/Author');

const test = async () => {
  mongoose.connect(process.env.MONGODB_URI);

  const author = await Author.findOne({ name: 'Nguyễn Nhật Ánh' });

  console.log(author);
};

test();
