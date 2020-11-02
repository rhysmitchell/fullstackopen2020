import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'

const CreateBlogForm = ({ user }) => {
  const dispatch = useDispatch()
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(create(title, author, url))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (!user) {
    return <></>
  }

  if (createBlogVisible) {
    return (
      <>
        <h3>Create new blog</h3>
        <form id='addBlogform' onSubmit={addBlog}>
          <div>
            Title
            <input
              id='title'
              type="text"
              value={title}
              name="Title"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </div>
          <div>
            Author
            <input
              id='author'
              type="text"
              value={author}
              name="Author"
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
          </div>

          <div>
            Url
            <input
              id='url'
              type="text"
              value={url}
              name="Url"
              onChange={(e) => setUrl(e.currentTarget.value)}
            />
          </div>
          <button id='BtnSubmitBlog' type="submit">Create</button>
          <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
        </form>
      </>
    )
  }
  else {
    return (
      <>
        <br />
        <button id='BtnCreateBlog' onClick={() => setCreateBlogVisible(true)}>Create new blog</button>
      </>
    )
  }
}

export default CreateBlogForm