import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    return (
        <form onSubmit={event => {
            event.preventDefault()
            dispatch(createAnecdote(event.target.content.value))
            dispatch(createNotification(event.target.content.value))
        }}>
            <input name="content" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AnecdoteForm;