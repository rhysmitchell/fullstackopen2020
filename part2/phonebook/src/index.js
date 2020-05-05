import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebookService';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(
    () =>
      phonebookService.getAll().then((response) => setPersons(response.data)),
    []
  );

  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map((person) => person.name.toLowerCase());
    if (names.includes(newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to the phonebook.`);
      return;
    }

    phonebookService
      .create(newPerson)
      .then((response) => setPersons((persons) => [...persons, response.data]));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <h2>Add a new contact</h2>
      <PersonForm
        addPerson={addPerson}
        setNewPerson={setNewPerson}
        newPerson={newPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
