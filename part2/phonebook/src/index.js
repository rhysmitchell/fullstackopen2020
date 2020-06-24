import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import phonebookService from './services/phonebookService';
import Notification from './components/Notification';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    phonebookService.getAll().then((response) => setContacts(response.data));
  }, []);

  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const flashMessage = (props) => {
    const { type, message, resetInterval } = props;

    setMessage({
      type: type,
      message: message,
    });

    setTimeout(() => {
      setMessage({
        type: null,
        message: null,
      });
    }, resetInterval);
  };

  const addContact = (event) => {
    event.preventDefault();

    const names = contacts.map((contact) => contact.name.toLowerCase());
    if (names.includes(newContact.name.toLowerCase())) {
      const confirmUpdate = window.confirm(
        `${newContact.name} is already added to the phonebook, replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const contactWithSameName = contacts.find(
          (contact) =>
            contact.name.toLowerCase() === newContact.name.toLowerCase()
        );
        phonebookService
          .update(contactWithSameName.id, newContact)
          .then((response) => {
            setContacts(response.data);
            flashMessage({
              type: 'success',
              message: `${newContact.name} was updated.`,
              resetInterval: 5000,
            });
          })
          .catch((error) => {
            flashMessage({
              type: 'error',
              message: `Information of ${contactWithSameName.name} has already been removed from the server.`,
              resetInterval: 5000,
            });
          });
      }
    } else {
      phonebookService.create(newContact).then((response) => {
        setContacts(response.data);

        flashMessage({
          type: 'success',
          message: `${newContact.name} was added.`,
          resetInterval: 5000,
        });
      });
    }
  };

  const deleteContactClick = (contact) => {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${contact.name}?`
    );

    if (confirmDeletion) {
      phonebookService.remove(contact.id).then((response) => {
        setContacts(response.data);
        setMessage({
          type: 'success',
          message: `${contact.name} was deleted.`,
          resetInterval: 5000,
        });
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification schema={message} />
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <h2>Add a new contact</h2>
      <ContactForm
        addContact={addContact}
        setNewContact={setNewContact}
        newContact={newContact}
      />

      <h2>Numbers</h2>
      <Contacts
        contacts={contacts}
        searchQuery={searchQuery}
        deleteContactClick={deleteContactClick}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
