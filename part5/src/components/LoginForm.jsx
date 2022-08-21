import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={login}>
        <div>
          <label htmlFor='username'>
            Username
            {' '}
            <input
              id='username'
              type='text'
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor='password'>
            Password
            {' '}
            <input
              id='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
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
