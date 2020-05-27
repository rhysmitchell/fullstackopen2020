import React from 'react';

const PhonebookList = (props) => {
  const { persons, searchQuery, deletePersonClick } = props;

  if (!persons) {
    return null;
  }

  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((person) => (
          <li key={person.name}>
            {person.name}: {person.number}{' '}
            <button onClick={() => deletePersonClick(person)}>Delete</button>
          </li>
        ))}
    </ul>
  );
};

export default PhonebookList;
