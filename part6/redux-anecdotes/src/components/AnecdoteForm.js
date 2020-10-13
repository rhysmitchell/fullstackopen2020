import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = props => {
    const addAnecdote = async event => {
        event.preventDefault()

        const anecdoteContent = event.target.content.value;
        event.target.content.value = ''

        props.createAnecdote(anecdoteContent)
        props.createNotification({ message: `${anecdoteContent} was successfully added.`, delay: 5000 })
    }

    return (
        <form onSubmit={event => addAnecdote(event)}>
            <input name="content" />
            <button type="submit">Add</button>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = { createAnecdote, createNotification }

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm