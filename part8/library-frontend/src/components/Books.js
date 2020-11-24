import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [booksResult, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if (books.data) {
      setBooks(books.data.allBooks)
      setFilteredBooks(books.data.allBooks)
    }
  }, [books.data])


  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const setBooksFilter = (filter) => {
    if (filter === '') {
      setFilteredBooks(booksResult)
    }
    else {
      setFilteredBooks(booksResult.filter(book => book.genres.includes(filter)))
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
      <button onClick={() => setBooksFilter('design')}>design</button>
      <button onClick={() => setBooksFilter('crime')}>crime</button>
      <button onClick={() => setBooksFilter('classic')}>classic</button>
    </div>
  )
}

export default Books