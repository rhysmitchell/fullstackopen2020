import React from 'react';
import Course from './Course';

const Courses = props => {
  const { courses } = props;
  return courses.map(course => <Course course={course} />);
};

export default Courses;
