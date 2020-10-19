import React from 'react';

const Country = (country) => (
    <li key={country.name}>
        <h3>{country.name} </h3>
        <div>capital {country.capital} </div>
        <div>population {country.population}</div>
        <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </li>
)

export default Country;