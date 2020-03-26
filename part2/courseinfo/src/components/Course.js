import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = props => {
  const { course } = props;
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
