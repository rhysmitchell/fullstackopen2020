import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = props => {
  const { good, neutral, bad } = props;
  const statsArr = [good, neutral, bad];
  const total = statsArr.reduce((a, b) => a + b, 0);
  const average =
    [good, neutral, bad].reduce((a, b) => a + b, 0) / statsArr.length;

  const percentageOfPositiveFeedback = (good * 100) / total || 0;
  if (total === 0) {
    return <span>No feedback given.</span>;
  }
  return (
    <>
      <h3>Statistics</h3>
      <span>Good: {good}</span>
      <br />
      <span>Neutral: {neutral}</span>
      <br />
      <span>Bad: {bad}</span>
      <br />
      <span>Total: {total}</span>
      <br />
      <span>Average: {average}</span>
      <br />
      <span>Positive: {percentageOfPositiveFeedback} %</span>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h3>Give Feedback</h3>

      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <br />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
