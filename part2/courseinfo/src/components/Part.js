import React from 'react';

const Part = props => (
  <p>
    {props.coursePart.name} {props.coursePart.exercises}
  </p>
);

export default Part;
