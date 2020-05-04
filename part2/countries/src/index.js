import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
import TooManyMatches from './components/TooManyMatches';
import SearchResults from './components/SearchResults';
import CountrySearch from './components/CountrySearch';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);

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
    setCountryToShow(null);
  };

  return (
    <div>
      <CountrySearch filterCountries={filterCountries} />

      <br />

      <SearchResults
        countries={filteredCountries}
        countryToShow={countryToShow}
        setCountryToShow={setCountryToShow}
      />

      <CountryDetails
        countries={filteredCountries}
        countryToShow={countryToShow}
      />
      <TooManyMatches countries={filteredCountries} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
