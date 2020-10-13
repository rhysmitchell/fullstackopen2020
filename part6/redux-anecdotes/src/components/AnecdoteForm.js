import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async event => {
        event.preventDefault()

        const anecdoteContent = event.target.content.value;
        event.target.content.value = ''

        dispatch(createAnecdote(anecdoteContent))
        dispatch(createNotification({ message: `${anecdoteContent} was successfully added.`, delay: 5000 }))
    }

    return (
        <form onSubmit={event => addAnecdote(event)}>
            <input name="content" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AnecdoteForm;