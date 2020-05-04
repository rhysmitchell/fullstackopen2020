import React from 'react';
const SearchResults = (props) => {
  const { countries, setCountryToShow } = props;

  if (countries.length > 10) {
    return <></>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>
          {country.name}{' '}
          {<button onClick={() => setCountryToShow(country)}>Show</button>}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
