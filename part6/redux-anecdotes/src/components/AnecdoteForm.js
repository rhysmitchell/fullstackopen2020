import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async event => {
        event.preventDefault()
        console.log(event.target)
        const anecdoteContent = event.target.content.value;
        event.target.content.value = ''

        const newAnecdote = await anecdoteService.createNew(anecdoteContent)
        dispatch(createAnecdote(newAnecdote))
        dispatch(createNotification(`${anecdoteContent} was successfully added.`))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000);
    }

    return (
        <form onSubmit={event => addAnecdote(event)}>
            <input name="content" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AnecdoteForm;