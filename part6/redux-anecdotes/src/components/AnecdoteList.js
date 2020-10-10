import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter.query) {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter.query))
        }

        return state.anecdotes
    })
    const dispatch = useDispatch()

    const voteClick = anecdote => {
        dispatch(vote(anecdote.id))
        dispatch(createNotification(`You voted for: ${anecdote.content}!`))

        setTimeout(() =>
            dispatch(clearNotification())
            , 5000);
    }

    return (
        anecdotes
            .sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteClick(anecdote)}>vote</button>
                    </div>
                </div>
            )
    )
}

export default AnecdoteList;