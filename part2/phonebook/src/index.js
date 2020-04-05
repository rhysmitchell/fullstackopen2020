import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map(person => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    setPersons(persons => [...persons, { name: newName }])
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label>Name: </label>
          <input onChange={(event) => setNewName(event.target.value)} value={newName} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
