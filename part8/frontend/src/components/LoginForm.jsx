import { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
  Mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const LoginForm = ({ handleNotification }) => {
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
    });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>
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
  );
};

export default LoginForm;
