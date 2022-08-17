import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ToggleComponent from './components/ToggleComponent';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [noti, setNoti] = useState(null);

  const blogFormRef = useRef();

  function sortBlogs(arrayOfBlogs) {
    return arrayOfBlogs.sort((a, b) => a.likes - b.likes);
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((allBlogs) => setBlogs(sortBlogs(allBlogs)))
      .catch(() => {
        setNoti({ message: 'cannot get blogs', color: 'red' });
        setTimeout(() => {
          setNoti(null);
        }, 5000);
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

      setNoti({ message: `user ${loggedInUser.name} logged in`, color: 'green' });
    } catch (e) {
      setNoti({ message: e.response.data.error, color: 'red' });
    }

    setTimeout(() => {
      setNoti(null);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedInUser');

    setNoti({ message: `user ${user.name} logged out`, color: 'green' });

    setTimeout(() => {
      setNoti(null);
    }, 5000);
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const blog = await blogService.create(blogObject);
      setBlogs(sortBlogs(blogs.concat(blog)));
      setNoti({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        color: 'green',
      });
    } catch (e) {
      setNoti({
        message: `blog ${blogObject.title} due to: ${e.response.data.error}`,
        color: 'red',
      });
    }

    setTimeout(() => {
      setNoti(null);
    }, 5000);
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
      <Notification noti={noti} />
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
