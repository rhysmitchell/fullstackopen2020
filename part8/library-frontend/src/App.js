
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })

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


  return (
    <div>
      <Notification schema={message} />

      {!token && (
        <LoginForm
          setToken={setToken}
          flashMessage={flashMessage}
        />
      )}

      {token && (<>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
        </div>


        <Authors
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
      </>)}
    </div>
  )
}

export default App