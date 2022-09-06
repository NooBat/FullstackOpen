import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../queries';

const LoginForm = ({ show, setToken, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification({
        message: error.graphQLErrors[0].message,
        type: 'error',
      });
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem('library-user-token', token);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  const handleLogin = (event) => {
    event.preventDefault();
    login({
      variables: {
        username,
        password,
      },
    });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          type='text'
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password{' '}
        <input
          type='password'
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
