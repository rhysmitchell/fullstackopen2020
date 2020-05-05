import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebookService';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response.data));
  }, [persons]);

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

  const deletePersonClick = (person) => {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${person.name}?`
    );
    if (confirmDeletion) {
      phonebookService.remove(person.id).then((people) => setPersons(people));
    }
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
      <Persons
        persons={persons}
        searchQuery={searchQuery}
        deletePersonClick={deletePersonClick}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
