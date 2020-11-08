import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'


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
            <TextField
              id='title'
              type='text'
              value={title}
              name='Title'
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </div>
          <div>
            Author
            <TextField
              id='author'
              type="text"
              value={author}
              name="Author"
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
          </div>

          <div>
            Url
            <TextField
              id='url'
              type="text"
              value={url}
              name="Url"
              onChange={(e) => setUrl(e.currentTarget.value)}
            />
          </div>

          <br />

          <Button
            id='BtnSubmitBlog'
            variant="text"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            type='submit'
          >
            Create
          </Button>

          <Button
            size="small"
            variant="text"
            onClick={() => setCreateBlogVisible(false)}>Cancel</Button>
        </form>
      </>
    )
  }
  else {
    return (
      <>
        <br />
        <Button
          id='BtnCreateBlog'
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setCreateBlogVisible(true)}
        >
          Create New Blog
        </Button>
      </>
    )
  }
}

export default CreateBlogForm