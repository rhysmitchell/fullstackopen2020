import React from 'react';
import Part from './Part';

const Content = props => (
  <>
    {props.parts.map(coursePart => (
      <Part key={coursePart.name} coursePart={coursePart} />
    ))}
  </>
);

export default Content;
