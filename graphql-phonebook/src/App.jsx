import { useState } from 'react';
import { useQuery } from '@apollo/client';
import PersonForm from './components/PersonForm';

import { ALL_PERSONS } from './queries';

import Notification from './components/Notification';
import Persons from './components/Persons';
import PhoneForm from './components/PhoneForm';

const timeoutIdArray = [];

const App = () => {
  const [error, setError] = useState(null);
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

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Notification error={error} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={setNotification} />
      <PhoneForm setError={setNotification} />
    </>
  );
};

export default App;
