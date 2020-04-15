import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });

  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map((person) => person.name);
    if (names.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook.`);
      return;
    }

    setPersons((persons) => [...persons, newPerson]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label>Name: </label>
          <input
            onChange={(event) =>
              setNewPerson({
                ...newPerson,
                name: event.target.value,
              })
            }
            value={newPerson.name}
          />

          <br />

          <label>Number: </label>
          <input
            onChange={(event) =>
              setNewPerson({
                ...newPerson,
                number: event.target.value,
              })
            }
            value={newPerson.number}
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
