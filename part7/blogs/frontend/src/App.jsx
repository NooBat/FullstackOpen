import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ToggleComponent from './components/ToggleComponent';

import userService from './services/user';

import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setNotification } from './reducers/notificationReducer';
import { loginUser } from './reducers/userReducer';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();
  const matchUser = useMatch('/users/:id');
  const matchBlog = useMatch('/blogs/:id');

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const blogFormRef = useRef();

  useEffect(() => {
    try {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    } catch (e) {
      dispatch(
        setNotification({ message: 'cannot get blogs', color: 'red' }, 5000)
      );
    }
  }, []);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(loginUser(userFromStorage));
    }
  }, []);

  const chosenUser = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null;

  const chosenBlog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null;

  return (
    <>
      <Notification />
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route
              path='/'
              element={
                <main>
                  <h2>blogs</h2>
                  <ToggleComponent
                    buttonLabel='create new blog'
                    ref={blogFormRef}
                  >
                    <BlogForm blogFormRef={blogFormRef} />
                  </ToggleComponent>
                  <BlogList />
                </main>
              }
            />
            <Route path='/blogs/:id' element={<Blog blog={chosenBlog} />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User user={chosenUser} />} />
          </Routes>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default App;
