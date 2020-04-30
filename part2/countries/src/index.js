import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const filterCountries = (countyName) => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(countyName)
      )
    );
  };

  return (
    <div>
      <span>Find countries </span>
      <input
        type='text'
        onChange={(e) => filterCountries(e.currentTarget.value.toLowerCase())}
      />

      <br />

      {filteredCountries.length === 1 && (
        <>
          <h2>{filteredCountries[0].name}</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li key={filteredCountries[0].capital}>
              <span>Capital: {filteredCountries[0].capital}</span>
            </li>
            <li key={filteredCountries[0].population}>
              <span>Population: {filteredCountries[0].population}</span>
            </li>
          </ul>

          <h2>Languages</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {filteredCountries[0].languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>

          <img
            src={filteredCountries[0].flag}
            alt={filteredCountries[0].name}
            style={{ maxWidth: '200px', maxHeight: 'auto' }}
          />
        </>
      )}

      {filteredCountries.length > 1 && filteredCountries.length < 10 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      )}

      {filteredCountries.length > 10 && (
        <span>Too many matches, specify another filter</span>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
