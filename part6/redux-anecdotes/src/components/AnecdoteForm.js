import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    return (
        <form onSubmit={event => {
            event.preventDefault()
            dispatch(createAnecdote(event.target.content.value))
        }}>
            <input name="content" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AnecdoteForm;