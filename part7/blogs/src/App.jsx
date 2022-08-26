import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ToggleComponent from './components/ToggleComponent';

import blogService from './services/blogs';
import loginService from './services/login';

import { getAll, createNew } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    try {
      dispatch(getAll());
    } catch (e) {
      dispatch(setNotification({ message: 'cannot get blogs', color: 'red' }, 5000));
    }
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

  const createBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility();

    try {
      dispatch(createNew(blogObj));
      dispatch(
        setNotification(
          {
            message: `a new blog ${blogObj.title} by ${blogObj.author} added`,
            color: 'green',
          },
          5000,
        ),
      );
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `blog ${blogObj.title} due to: ${e.response.data.error}`,
            color: 'red',
          },
          5000,
        ),
      );
    }
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
          <BlogList username={user.username} />
        </main>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
