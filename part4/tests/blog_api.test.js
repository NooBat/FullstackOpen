const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
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
});

describe('addition of a new blog', () => {
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
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const blogs = blogsAtEnd.map((blog) => {
      const newBlog = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
      };

      return newBlog;
    });

    expect(blogs).not.toContainEqual(helper.initialBlogs[0]);
  });
});

describe('updating likes of a blog', () => {
  test('succeeds with status code 200 with the correct format and id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToUpdate = blogsAtStart[0];

    const newBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 100,
    };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200);

    const updatedBlog = response.body;

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const blogContent = {
      author: updatedBlog.author,
      title: updatedBlog.title,
      url: updatedBlog.url,
      likes: updatedBlog.likes,
    };

    const blogs = blogsAtEnd.map((blog) => {
      const removeIdBlog = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
      };

      return removeIdBlog;
    });

    expect(blogs).toContainEqual(blogContent);
    expect(blogs).not.toContainEqual(helper.initialBlogs[0]);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
