import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ToggleComponent from './components/ToggleComponent';

import userService from './services/user';

import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setNotification } from './reducers/notificationReducer';
import { loginUser, logoutUser } from './reducers/userReducer';

const userSelector = (state) => state.user;

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const blogFormRef = useRef();

  useEffect(() => {
    try {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    } catch (e) {
      dispatch(setNotification({ message: 'cannot get blogs', color: 'red' }, 5000));
    }
  }, []);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(loginUser(userFromStorage));
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    userService.clearUser();
    dispatch(setNotification({ message: `user ${user.name} logged out`, color: 'green' }, 5000));
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
              logged in
              <button type='button' onClick={handleLogout}>
                Logout
              </button>
            </p>
          </section>
          <ToggleComponent buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </ToggleComponent>
          <BlogList />
        </main>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default App;
