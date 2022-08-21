import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        {' '}
        <label htmlFor='username'>
          Username
          {' '}
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            name='username'
            id='username'
          />
        </label>
      </div>
      <div>
        {' '}
        <label htmlFor='password'>
          Password
          {' '}
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            name='password'
            id='password'
          />
        </label>
      </div>
      <button id='login-button' type='submit'>
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
