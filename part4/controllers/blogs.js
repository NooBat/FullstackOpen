const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

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

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
    likes: likes || 0,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id;
  const user = request.user;

  const blog = await Blog.findById(id);

  if (blog.user.toString() === user._id.toString()) {
    await blog.remove();
    return response.status(204).end();
  }

  response.status(401).send({
    error: 'unauthorized',
  });
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
