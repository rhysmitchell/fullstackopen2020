import React from 'react';
import Country from './Country'

const Countries = props => {
    const { countries } = props;
  
    if (!countries) {
      return null
    }
  
    if (!countries.found) {
      return (
        <div>
          No countries found &hellip;
        </div>
      )
    }
  
    return (<ul>{countries.countries.map(country => Country(country))}</ul>)
  }

export default Countries;