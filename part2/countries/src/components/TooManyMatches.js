import React from 'react';

const TooManyMatches = ({ countries }) => {
  if (countries.length < 10) {
    return <></>;
  }

  return <span>Too many matches, specify another filter</span>;
};

export default TooManyMatches;
