import { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const LoginForm = ({ show, handleNotification, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);

  const handleLogin = async (event) => {
    event.preventDefault();

    login({
      variables: {
        username,
        password,
      },
      onError: (error) =>
        handleNotification({
          message: error.graphQLErrors[0].message,
          severity: 'error',
        }),
      onCompleted: (data) => {
        setToken(data?.login?.value);
        localStorage.setItem('library-user-token', data?.login?.value);
      },
    });

    setUsername('');
    setPassword('');
  };

  return show ? (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>
          username:{' '}
          <input
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          password:{' '}
          <input
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>log in</button>
    </form>
  ) : null;
};

export default LoginForm;
