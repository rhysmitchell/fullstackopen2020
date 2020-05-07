import React from 'react';

const Notification = ({ schema }) => {
  if (!schema.message) {
    return null;
  }

  const error = {
    color: schema.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={error}>{schema.message}</div>;
};

export default Notification;
