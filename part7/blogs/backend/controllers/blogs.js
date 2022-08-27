const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
  });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById(id).populate('user', {
    name: true,
    username: true,
  });

  response.json(blog);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  if (!user) {
    return response.status(401).send({ error: 'missing token' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
    likes: likes || 0,
    comments: [],
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(
    await Blog.populate(savedBlog, {
      path: 'user',
      select: {
        name: true,
        username: true,
      },
    })
  );
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body;
  console.log(request.params.id);

  const blogById = await Blog.findById(request.params.id).populate({
    path: 'user',
    select: {
      name: true,
      username: true,
    },
  });

  blogById.comments = blogById.comments.concat(comment);
  await blogById.save();

  response.status(201).json(blogById);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;

  const blogToDelete = await Blog.findById(blogId);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (
    blogToDelete.user &&
    blogToDelete.user.toString() === user.id.toString()
  ) {
    await blogToDelete.remove();
    return response.status(204).end();
  }

  response.status(401).send({
    error: 'only creator can delete a blog',
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
  }).populate('user', {
    name: true,
    username: true,
  });

  response.json(returnedBlog);
});

module.exports = blogsRouter;
