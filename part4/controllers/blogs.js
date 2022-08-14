const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById(id).populate('user', {
    name: true,
    username: true,
    id: true,
  });

  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, userId } = request.body;

  const user = await User.findById(userId);

  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
    likes: likes || 0,
  });

  const savedBlog = await blog.save();
  console.log(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;

  const updatedBlog = {
    ...request.body,
    likes: request.body.likes || 0,
  };

  const returnedBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(returnedBlog);
});

module.exports = blogsRouter;
