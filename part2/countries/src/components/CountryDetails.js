import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetails = (props) => {
  const { countries, countryToShow } = props;

  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />;
  } else if (countryToShow) {
    return <SingleCountry country={countryToShow} />;
  }

  return <></>;
};

const SingleCountry = ({ country }) => {
  const [weatherDetails, setWeatherDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`
      )
      .then((response) => {
        setWeatherDetails(response.data.current);
      });
  }, [country.name]);

  return (
    <>
      <h2>{country.name}</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li key={country.capital}>
          <span>Capital: {country.capital}</span>
        </li>
        <li key={country.population}>
          <span>Population: {country.population}</span>
        </li>
      </ul>
      <h2>Languages</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={country.name}
        style={{ maxWidth: '200px', maxHeight: 'auto' }}
      />
      <h2 style={{ margin: 0 }}>Weather in {country.name}</h2>
      <strong>Temperature: </strong>
      {weatherDetails.temperature} Celcius
      <br />
      {weatherDetails.weather_icons &&
        weatherDetails.weather_icons.map((icon) => (
          <img src={icon} alt={weatherDetails.observation_time} />
        ))}
      <br />
      <strong>Wind: </strong> {weatherDetails.wind_speed} mph direction{' '}
      {weatherDetails.wind_dir}
    </>
  );
};

export default CountryDetails;
