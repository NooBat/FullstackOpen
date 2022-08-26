import React from 'react';
import { useDispatch } from 'react-redux';

import loginService from '../services/login';
import userService from '../services/user';

import { useField } from '../hooks';
import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, resetUsername] = useField('text');
  const [password, resetPassword] = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    const userObj = { username: username.value, password: password.value };
    try {
      const loggedInUser = await loginService.login(userObj);
      userService.setUser(loggedInUser);

      resetUsername();
      resetPassword();

      dispatch(loginUser(loggedInUser));
      dispatch(
        setNotification({ message: `user ${loggedInUser.name} logged in`, color: 'green' }, 5000),
      );
    } catch (e) {
      dispatch(setNotification({ message: e.response.data.error, color: 'red' }, 5000));
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>
            Username
            {' '}
            <input id='username' name='username' {...username} required />
          </label>
        </div>
        <div>
          <label htmlFor='password'>
            Password
            {' '}
            <input id='password' name='password' {...password} required />
          </label>
        </div>
        <div>
          <button id='login-button' type='submit'>
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
