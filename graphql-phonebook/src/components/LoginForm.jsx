import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { useField } from '../hooks';

import { LOGIN } from '../queries';

const LoginForm = ({ setToken, setNotification }) => {
  const [usernameField, resetUsernameField] = useField('text');
  const [passwordField, resetPasswordField] = useField('password');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem('phonenumbers-user-token', token);
    }
  }, [result.data]);

  const handleLogin = (event) => {
    event.preventDefault();
    login({
      variables: {
        username: usernameField.value,
        password: passwordField.value,
      },
    });
    resetUsernameField();
    resetPasswordField();
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input {...usernameField} />
      </div>
      <div>
        password <input {...passwordField} />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
