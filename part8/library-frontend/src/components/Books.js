import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])
  
  if (!props.show) {
    return null
  }
  
  if (books.loading) {
    return <div>loading...</div>
  }
  
  const setBooksFilter = (filter) => {
    if (filter === '') {
      setFilteredBooks(books.data.allBooks)
    }
    else {
      setFilteredBooks(books.data.allBooks.filter(book => book.genres.includes(filter)))
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={() => setBooksFilter('refactoring')}>refactoring</button>
      <button onClick={() => setBooksFilter('agile')}>agile</button>
      <button onClick={() => setBooksFilter('patterns')}>patterns</button>
      <button onClick={() => setBooksFilter('database')}>database</button>
      <button onClick={() => setBooksFilter('programming')}>programming</button>
      <button onClick={() => setBooksFilter('')}>all genres</button>
    </div>
  )
}

export default Books