import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState([
    { anecdote: 'If it hurts, do it more often', votes: 0 },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      anecdote:
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      anecdote:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    { anecdote: 'Premature optimization is the root of all evil.', votes: 0 },
    {
      anecdote:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    }
  ]);

  const selectNextAnecdote = () => {
    const randomNumberInRange = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumberInRange);
  };

  const handleVote = () => {
    const newAnecdotesArray = [...anecdotes];
    newAnecdotesArray[selected].votes += 1;

    setAnecdotes(newAnecdotesArray);
  };

  return (
    <>
      {anecdotes[selected].anecdote}
      <br />
      has {anecdotes[selected].votes} votes
      <br />
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => selectNextAnecdote()}>Next anecdote</button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
