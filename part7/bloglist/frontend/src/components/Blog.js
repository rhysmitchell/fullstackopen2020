import React from 'react'
import { useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
  const id = useParams()?.id
  const blog = blogs.filter(blog => blog.id === id)

  const dispatch = useDispatch()

  if (!blog) {
    return null
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

    </div>)
}

export default Blog