/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useField, useCountry } from './hooks';

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>
        population
        {country.population}
      </div>
      <div>
        capital
        {country.capital}
      </div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
