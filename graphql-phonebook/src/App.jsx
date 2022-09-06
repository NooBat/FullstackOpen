import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import PersonForm from './components/PersonForm';

import { ALL_PERSONS } from './queries';

import Notification from './components/Notification';
import Persons from './components/Persons';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const timeoutIdArray = [];

const App = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS);

  const setNotification = (errorMessage) => {
    clearTimeout(timeoutIdArray.shift());
    setError(errorMessage);
    timeoutIdArray.push(
      setTimeout(() => {
        setError(null);
      }, 10000)
    );
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <>
        <Notification error={error} />
        <LoginForm setToken={setToken} setNotification={setNotification} />
      </>
    );
  }

  return (
    <>
      <Notification error={error} />
      <button type='button' onClick={logout}>
        logout
      </button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={setNotification} />
      <PhoneForm setError={setNotification} />
    </>
  );
};

export default App;
