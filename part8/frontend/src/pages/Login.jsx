import { useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import LoginForm from '../components/LoginForm';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const Login = ({ show, handleNotification, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);

  if (!show) {
    return null;
  }

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
        console.log(data);
        setToken(data?.login?.value);
        localStorage.setItem('library-user-token', data?.login?.value);
      },
    });

    setUsername('');
    setPassword('');
  };

  return (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default Login;
