import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove, addComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  
  const id = useParams()?.id

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(blog => blog.id === id)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  if (!blog.length) {
    return null
  }

  const addCommentToBlog = (event) => {
    event.preventDefault()

    dispatch(addComment(id, comment))
    setComment('')
  }

  const blogToDisplay = blog[0]


  return (
    <div className='outer-blog-details' key={blogToDisplay.id}>
      <h3 className='title-value'>{blogToDisplay.title} [by {blogToDisplay.author}]</h3>
      <ul className='inner-blog-details'>
        <li><a href={blogToDisplay.url}>{blogToDisplay.url}</a></li>
        <li>
          <span className='likes-value'>
            {blogToDisplay.likes}
          </span>
          <button className='like-button' onClick={() => dispatch(like(blogToDisplay))}>Like</button>
        </li>
        <li>{blogToDisplay.user.name}</li>
        <li>
          <button className='delete-button' onClick={() => dispatch(remove(blogToDisplay.id))}>Remove</button>
        </li>
      </ul>

      <h3>Comments</h3>
      <form onSubmit={addCommentToBlog}>
        <input type='text' onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blogToDisplay.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>)
}

export default Blog