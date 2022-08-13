const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.post('/:id', async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);
});

module.exports = usersRouter;
