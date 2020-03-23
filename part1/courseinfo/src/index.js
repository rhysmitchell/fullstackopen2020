import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack application development';
  const Header = props => <h1>{props.course}</h1>;

  const parts = [
    {
      title: 'Fundamentals of React',
      numberOfExercises: 10
    },
    {
      title: 'Using props to pass data',
      numberOfExercises: 7
    },
    {
      title: 'State of a component',
      numberOfExercises: 14
    }
  ];
  const Content = props => (
    <>
      {props.parts.map(coursePart => (
        <p>
          {coursePart.title} {coursePart.exercise}
        </p>
      ))}
    </>
  );

  const accumulatedNumbersOfExercises = parts.map(
    coursePart => coursePart.numberOfExercises
  );

  const totalNumberOfExercises = accumulatedNumbersOfExercises.numberOfExercises.reduce(
    (exercise1, exercise2) => exercise1 + exercise2,
    0
  );
  const Total = props => <p>Number of exercises {props.total}</p>;

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalNumberOfExercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
