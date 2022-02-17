import React, { useEffect } from "react";
import axios from "axios";

const Country = ({ countries, handleClick }) => {
  const generateLanguages = (languages) => {
    return Object.entries(languages).map((language) => {
      return <li key={language[0]}>{language[1]}</li>;
    });
  };

  useEffect(() => {
    if (countries.length === 1) {
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${countries[0].latlng[0]}&lon=${countries[0].latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((response) => {
        countries[0].weatherIcon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        countries[0].temperature = response.data.main.temp
        countries[0].wind = response.data.wind.speed
      })
    }
  })

  const generateCountries = (countries) => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length === 1) {
      const country = countries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h4>languages:</h4>
          <ul>{generateLanguages(country.languages)}</ul>
          <img src={country.flags.png} alt={country.name.common + "'s flag"} />
          <p>temperature {country.temperature} Celcius</p>
          <img src={country.weatherIcon} alt={"weather at " + country.capital}/>
          <p>wind {country.wind} m/s</p>
        </div>
      );
    } else if (countries.length === 0) {
      return <p>No match found</p>
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
              show detail
            </button>
          </div>
        );
      });
    }
  };

  return <div>{generateCountries(countries)}</div>;
};

export default Country;
