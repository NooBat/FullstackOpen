const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const arrayOfPromises = blogs.map((blog) => blog.save());
  await Promise.all(arrayOfPromises);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('all blogs have an "id" property instead of "_id"', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8');

  const blogs = await helper.blogsInDb();
  expect(blogs.length).toBe(helper.initialBlogs.length + 1);

  const urls = blogs.map((blog) => blog.url);

  expect(urls).toContain(
    'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  );
});

test('a blog without "likes" property will be default to 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8');

  const blogs = await helper.blogsInDb();
  expect(blogs.length).toBe(helper.initialBlogs.length + 1);

  const removeId = blogs.map((blog) => {
    const removeIdBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes,
      url: blog.url,
    };
    return removeIdBlog;
  });
  expect(removeId).toContainEqual(
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
  );
});

test('a blog without "title" or "url" property will result in 400 Bad Request', async () => {
  const faultyBlog = {
    author: 'Robert C. Martin',
  };

  await api
    .post('/api/blogs')
    .send(faultyBlog)
    .expect(400);

  const blogs = await helper.blogsInDb();
  expect(blogs.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
