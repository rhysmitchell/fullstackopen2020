import React from 'react';

const PhonebookList = (props) => {
  const { contacts, searchQuery, deleteContactClick } = props;

  if (!contacts) {
    return null;
  }

  return (
    <ul>
      {contacts
        .filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}{' '}
            <button onClick={() => deleteContactClick(person)}>Delete</button>
          </li>
        ))}
    </ul>
  );
};

export default PhonebookList;
