import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const Header = props => <h1>{props.course.name}</h1>;
  const Content = props => (
    <>
      {props.parts.map(coursePart => (
        <Part coursePart={coursePart} />
      ))}
    </>
  );
  const Part = props => (
    <p>
      {props.coursePart.name} {props.coursePart.exercises}
    </p>
  );

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const Total = props => {
    const accumulatedNumbersOfExercises = props.parts.map(
      coursePart => coursePart.exercises
    );

    const totalNumberOfExercises = accumulatedNumbersOfExercises.reduce(
      (exercise1, exercise2) => exercise1 + exercise2,
      0
    );

    return <p>Number of exercises {totalNumberOfExercises}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
