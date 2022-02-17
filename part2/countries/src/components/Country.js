import React from "react";

const Country = ({ countries, handleClick }) => {
  const showCountry = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <ul>{generateLanguages(country.languages)}</ul>
        <img src={country.flags.png} alt={country.name.common}></img>
      </div>
    );
  };

  const generateLanguages = (languages) => {
    return Object.entries(languages).map((language) => {
      return <li key={language[0]}>{language[1]}</li>;
    });
  };

  const generateCountries = (countries) => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length === 1) {
      const country = countries[0];
      return showCountry(country);
    } else {
      return countries.map((country) => {
        const name = country.name.common;
        return (
          <div key={name}>
            {name}
            <button
              onClick={() => {
                handleClick(name);
              }}
            >
              show
            </button>
          </div>
        );
      });
    }
  };

  return <div>{generateCountries(countries)}</div>;
};

export default Country;
