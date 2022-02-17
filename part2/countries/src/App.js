import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  console.log(API_KEY);

  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/countries").then((response) => {
      setCountries(
        response.data.map((country) => {
          // if (country.capital) {
          //   axios
          //     .get(
          //       `http://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
          //     )
          //     .then((weatherResponse) => {
          //       console.log(weatherResponse.data);
          //       country.weather = `http://openweathermap.org/img/wn/${weather}@2x.png`
          //       country.temp = weatherResponse.data.main.temp;
          //       country.wind = weatherResponse.data.wind.speed;
          //     });
          // }
          country.show = false;
          return country;
        })
      );
    });
  }, []);

  const handleClick = (name) => {
    console.log("clicked");
    setCountries(
      countries.map((country) => {
        if (country.name.common === name) {
          country.show = true;
        } else {
          country.show = false;
        }
        return country;
      })
    );
  };

  const handleInput = (event) => {
    if (event.target.value.length === 0) {
      setShowCountries(false);
      setCountries(
        countries.map((country) => {
          country.show = false;
          return country;
        })
      );
    } else {
      setShowCountries(true);
      setCountries(
        countries.map((country) => {
          if (
            country.name.common
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) > -1
          ) {
            country.show = true;
          } else {
            country.show = false;
          }
          return country;
        })
      );
    }
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleInput} type="text" />
      </div>
      <Country
        countries={
          showCountries ? countries.filter((country) => country.show) : []
        }
        handleClick={handleClick}
      />
    </div>
  );
};

export default App;
