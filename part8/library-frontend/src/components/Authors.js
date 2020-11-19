
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select';

const Authors = (props) => {
  const { token, flashMessage, show } = props;

  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      await editAuthor({
        variables: { name, setBornTo: parseInt(born) },
      })
    } catch (error) {
      flashMessage({
        type: 'error',
        message: error.message,
        resetInterval: 5000,
      })
    }


    setName('')
    setBorn('')
  }

  const authorNames = authors.data.allAuthors.map(author => { return { label: author.name, value: author.name } })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {token && <>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
          <Select
              options={authorNames}
              onChange={({ value }) => setName(value)}
            />
          </div>

          <div>
            born
          <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>

          <button type="submit">
            update author
        </button>
        </form>
      </>}
    </div>
  )
}

export default Authors
