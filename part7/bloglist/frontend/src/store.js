import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
  user: userReducer,
  users: usersReducer
})

export const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))