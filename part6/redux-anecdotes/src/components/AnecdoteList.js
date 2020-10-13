import React from 'react'
import { connect } from 'react-redux'
// import { vote } from '../reducers/anecdoteReducer'
// import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotesToShow = () => {
        if (props.filter.query) {
            return props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter.query))
        }

        return props.anecdotes
    }

    const voteClick = anecdote => {
        // dispatch(vote(anecdote.id))
        // dispatch(createNotification({ message: `You voted for: ${anecdote.content}!`, delay: 5000 }))
    }

    return (
        anecdotesToShow()
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdotes