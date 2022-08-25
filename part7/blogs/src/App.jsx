import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ToggleComponent from './components/ToggleComponent';

import blogService from './services/blogs';
import loginService from './services/login';

import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  function sortBlogs(arrayOfBlogs) {
    return arrayOfBlogs.sort((a, b) => a.likes - b.likes);
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((allBlogs) => setBlogs(sortBlogs(allBlogs)))
      .catch(() => {
        dispatch(setNotification({ message: 'cannot get blogs', color: 'red' }, 5000));
      });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const loggedInUser = await loginService.login(userObject);

      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      dispatch(
        setNotification({ message: `user ${loggedInUser.name} logged in`, color: 'green' }, 5000),
      );
    } catch (e) {
      dispatch(setNotification({ message: e.response.data.error, color: 'red' }, 5000));
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedInUser');

    dispatch(setNotification({ message: `user ${user.name} logged out`, color: 'green' }, 5000));
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const blog = await blogService.create(blogObject);
      setBlogs(sortBlogs(blogs.concat(blog)));
      dispatch(
        setNotification(
          {
            message: `a new blog ${blog.title} by ${blog.author} added`,
            color: 'green',
          },
          5000,
        ),
      );
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `blog ${blogObject.title} due to: ${e.response.data.error}`,
            color: 'red',
          },
          5000,
        ),
      );
    }
  };

  const updateLikes = async (newBlog) => {
    const updatedBlog = await blogService.update(newBlog);

    setBlogs(sortBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))));
  };

  const handleDelete = async (id) => {
    await blogService.deleteBlog(id);
    setBlogs(sortBlogs(blogs.filter((blog) => blog.id !== id)));
  };

  return (
    <>
      <Notification />
      {user ? (
        <main>
          <h2>blogs</h2>
          <section>
            <p>
              {user.name}
              {' '}
              logged in
              <button type='button' onClick={handleLogout}>
                Logout
              </button>
            </p>
          </section>
          <ToggleComponent buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </ToggleComponent>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              updateLikes={updateLikes}
              handleDelete={handleDelete}
            />
          ))}
        </main>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
