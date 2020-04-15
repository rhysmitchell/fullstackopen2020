import React from 'react';

const PhonebookList = ({ persons, searchQuery }) => (
  <ul>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ))}
  </ul>
);

export default PhonebookList;
