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
      <table>
        <tbody>
          <Statistic text='Good' value={good} />
          <Statistic text='Neutral' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <Statistic text='Total' value={total} />
          <Statistic text='Average' value={average} />
          <Statistic text='Positive' value={percentageOfPositiveFeedback} />
        </tbody>
      </table>
    </>
  );
};

const Button = props => {
  const { clickHandler, text } = props;
  return <button onClick={clickHandler}>{text}</button>;
};

const Statistic = props => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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

      <Button text='Good' clickHandler={() => setGood(good + 1)} />
      <Button text='Neutral' clickHandler={() => setNeutral(neutral + 1)} />
      <Button text='Bad' clickHandler={() => setBad(bad + 1)} />

      <br />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
