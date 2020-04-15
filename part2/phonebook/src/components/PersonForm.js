import React from 'react';

const PersonForm = ({ addPerson, setNewPerson, newPerson }) => (
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
);

export default PersonForm;
