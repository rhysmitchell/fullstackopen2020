
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      flashMessage({
        type: 'success',
        message: `${addedBook.title} was successfully added.`,
        resetInterval: 5000,
      })

      updateCacheWith(addedBook)
    }
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
          <button onClick={() => setPage('recommendations')}>recommendations</button>
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
        updateCacheWith={updateCacheWith}
      />

      <Recommendations
        show={page === 'recommendations'}
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