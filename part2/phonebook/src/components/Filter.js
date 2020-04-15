import React from 'react';

const PhonebookFilter = ({ searchQuery, setSearchQuery }) => (
  <>
    <label>Filter: </label>
    <input
      type='text'
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
    />
  </>
);

export default PhonebookFilter;
