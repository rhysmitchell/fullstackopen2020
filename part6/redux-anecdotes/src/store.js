import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
  })

export const store = createStore(combinedReducer, composeWithDevTools())