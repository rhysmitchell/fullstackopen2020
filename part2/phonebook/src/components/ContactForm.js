import React from 'react';

const PersonForm = ({ addContact, setNewContact, newContact }) => (
  <form onSubmit={addContact}>
    <div>
      <label>Name: </label>
      <input
        onChange={(event) =>
          setNewContact({
            ...newContact,
            name: event.target.value,
          })
        }
        value={newContact.name}
      />

      <br />

      <label>Number: </label>
      <input
        onChange={(event) =>
          setNewContact({
            ...newContact,
            number: event.target.value,
          })
        }
        value={newContact.number}
      />
    </div>
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
);

export default PersonForm;
