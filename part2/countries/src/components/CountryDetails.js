import React from 'react';

const CountryDetails = (props) => {
  const { countries, countryToShow } = props;

  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />;
  } else if (countryToShow) {
    return <SingleCountry country={countryToShow} />;
  }

  return <></>;
};

const SingleCountry = ({ country }) => (
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
  </>
);

export default CountryDetails;
