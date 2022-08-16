import React, { useState } from 'react';

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
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
