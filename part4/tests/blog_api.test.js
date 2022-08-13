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
    const newBlog = {
      title: 'Five mistakes you make with React',
      author: 'Daniel Kadavra',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend',
      likes: 8,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Five mistakes you make with React');
  });

  test("sending a blog without 'likes' attribute default it to 0", async () => {
    const withoutLikesBlog = {
      title: 'Five mistakes you make with React',
      author: 'Daniel Kadavra',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#more-tests-and-refactoring-the-backend',
    };

    await api
      .post('/api/blogs')
      .send(withoutLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const requestedBlog = blogsAtEnd.find(
      (blog) => blog.title === withoutLikesBlog.title
    );

    expect(requestedBlog.likes).toBe(0);
  });

  test("a blog without 'title' or 'url' attributes will not be sent and result in 400 Bad Request", async () => {
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
      await api.post('/api/blogs').send(blog).expect(400);
    }

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
}, 10000);

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

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

    console.log(blogToUpdate);

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

  // test('unsuccessfully with status code 400 if id or data are invalid', async () => {
  //   const blogsAtStart = await helper.blogsInDb();
  //   const blogsToUpdate = blogsAtStart.slice(0, 3);

  //   const updatedBlogs = [
  //     {
  //       ...blogsToUpdate[0],
  //       url: 'test',
  //       likes: blogsToUpdate[0] + 10,
  //     },
  //     {
  //       ...blogsToUpdate[1],
  //       id: '393993k3331',
  //       url: 'test',
  //       likes: blogsToUpdate[1] + 10,
  //     },
  //     {
  //       ...blogsToUpdate[2],
  //       id: '333,3333',
  //       title: 2,
  //     },
  //   ];

  //   for (const updatedBlog of updatedBlogs) {
  //     await api
  //       .put(`/api/blogs/${updatedBlog.id}`)
  //       .send(updatedBlog)
  //       .expect(400);
  //   }


  //   const blogsAtEnd = await helper.blogsInDb();
  //   const urls = blogsAtEnd.map((blog) => blog.url);
  //   expect(urls).not.toContain('test');
  // });
});

afterAll(() => {
  mongoose.connection.close();
});
