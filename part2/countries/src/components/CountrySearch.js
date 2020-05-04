import React from 'react';

const CountrySearch = ({ filterCountries }) => {
  return (
    <>
      <span>Find countries </span>
      <input
        type='text'
        onChange={(e) => filterCountries(e.currentTarget.value.toLowerCase())}
      />
    </>
  );
};

export default CountrySearch;
