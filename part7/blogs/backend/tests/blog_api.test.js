const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('when there are some blogs in the database', () => {
  test('all blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogsAtStart = await helper.blogsInDb();
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length);
  });

  test("all blogs have 'id' attribute, not '_id' attribute", async () => {
    const blogsAtStart = await helper.blogsInDb();

    blogsAtStart.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  test('sucess with valid data', async () => {
    const user = await User.findOne({ username: 'noobat' });

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'Five mistakes you make with React',
      author: 'Daniel Kadavra',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend',
      likes: 8,
      user: user._id,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Five mistakes you make with React');
  });

  test("sending a blog without 'likes' attribute default it to 0", async () => {
    const user = await User.findOne({ username: 'noobat' });

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const withoutLikesBlog = {
      title: 'Five mistakes you make with React',
      author: 'Daniel Kadavra',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend',
    };

    await api
      .post('/api/blogs')
      .send(withoutLikesBlog)
      .auth(token, { type: 'bearer' })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const requestedBlog = blogsAtEnd.find(
      (blog) => blog.title === withoutLikesBlog.title
    );

    expect(requestedBlog.likes).toBe(0);
  });

  test("a blog without 'title' or 'url' attributes will not be sent and result in 400 Bad Request", async () => {
    const user = await User.findOne({ username: 'noobat' });

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const erroneousBlogs = [
      {
        author: 'Daniel Kadavra',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend',
      },
      {
        title: 'Five mistakes you make with React',
        author: 'Daniel Kadavra',
      },
      {
        author: 'Daniel Kadavra',
      },
    ];

    for (const blog of erroneousBlogs) {
      await api
        .post('/api/blogs')
        .send(blog)
        .auth(token, { type: 'bearer' })
        .expect(400);
    }

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('addition fail if unauthorized with status code 401', async () => {
    const blog = {
      title: 'Five mistakes you make with React',
      author: 'Daniel Kadavra',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend',
    };

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid and authorized', async () => {
    const user = await User.findOne({ username: 'noobat' });

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await Blog.findByIdAndUpdate(
      blogToDelete.id,
      { ...blogToDelete, user: user._id },
      { new: true }
    );

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 if id and data are valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[1];

    const updatedBlog = {
      ...blogToUpdate,
      title: `Updated ${blogToUpdate.title}`,
      likes: blogToUpdate.likes + 10,
    };

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(updatedBlog.title);
  });

  test('unsuccessfully with status code 400 if id or data are invalid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogsToUpdate = blogsAtStart.slice(0, 3);

    const updatedBlogs = [
      {
        ...blogsToUpdate[0],
        url: 'test',
        likes: blogsToUpdate[0] + 10,
      },
      {
        ...blogsToUpdate[1],
        id: '393993k3331',
        url: 'test',
        likes: blogsToUpdate[1] + 10,
      },
      {
        ...blogsToUpdate[2],
        id: '333,3333',
        title: 2,
      },
    ];

    for (const updatedBlog of updatedBlogs) {
      await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(400);
    }

    const blogsAtEnd = await helper.blogsInDb();
    const urls = blogsAtEnd.map((blog) => blog.url);
    expect(urls).not.toContain('test');
  });
});

describe('when there is initially some users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const blogsAtStart = await helper.blogsInDb();

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({
      username: 'defacto',
      passwordHash,
      blogs: [blogsAtStart[3]._id, blogsAtStart[4]._id],
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Daniel Nguyen',
      username: 'noobat',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain('noobat');
  });

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Daniel Nguyen',
      username: 'defacto',
      password: 'password',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper status code and message if password is invalid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUsers = [
      {
        name: 'Daniel Nguyen',
        username: 'noobat',
        password: 'pw',
      },
      {
        name: 'Daniel Nguyen',
        username: 'noobat',
      },
    ];

    const shortPasswordResult = await api
      .post('/api/users')
      .send(newUsers[0])
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(shortPasswordResult.body.error).toBe(
      'password must have minimum length of 3'
    );

    const undefinedPasswordResult = await api
      .post('/api/users')
      .send(newUsers[1])
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(undefinedPasswordResult.body.error).toBe(
      'password must not be empty'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper status code and message if username is invalid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUsers = [
      {
        name: 'Daniel Nguyen',
        username: 'no',
        password: '123',
      },
      {
        name: 'Daniel Nguyen',
        password: '123',
      },
    ];

    for (const newUser of newUsers) {
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    }

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
