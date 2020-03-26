import React from 'react';

const Total = props => {
  const accumulatedNumbersOfExercises = props.parts.map(
    coursePart => coursePart.exercises
  );

  const totalNumberOfExercises = accumulatedNumbersOfExercises.reduce(
    (exercise1, exercise2) => exercise1 + exercise2,
    0
  );

  return <strong>Total of {totalNumberOfExercises} exercises</strong>;
};

export default Total;
