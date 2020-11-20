
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })

  const client = useApolloClient()

  const flashMessage = (props) => {
    const { type, message, resetInterval } = props

    setMessage({
      type: type,
      message: message,
    })

    setTimeout(() => {
      setMessage({
        type: null,
        message: null,
      })
    }, resetInterval)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <Notification schema={message} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button>
        </>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>


      <Authors
        token={token}
        flashMessage={flashMessage}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        flashMessage={flashMessage}
        show={page === 'add'}
      />

      <LoginForm
        setToken={setToken}
        flashMessage={flashMessage}
        show={page === 'login' && !token}
      />
    </div>
  )
}

export default App