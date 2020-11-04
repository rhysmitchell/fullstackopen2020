import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'

const Blog = (props) => {
  const [blogHidden, setBlogHidden] = useState(true)
  const dispatch = useDispatch()

  return (
    <li className='outer-blog-details' key={props.blog.id}>
      <span className='title-value'>{props.blog.title} [by {props.blog.author}]</span>
      <button className="expand-blog-button" onClick={() => setBlogHidden(!blogHidden)}>{blogHidden ? 'Show' : 'Hide'}</button>
      {!blogHidden &&
        (<ul className='inner-blog-details'>
          <li>{props.blog.url}</li>
          <li>
            <span className='likes-value'>
              {props.blog.likes}
            </span>
            <button className='like-button' onClick={() => dispatch(like(props.blog))}>Like</button>
          </li>
          <li>{props.blog.user.name}</li>
          <li>
            <button className='delete-button' onClick={() => dispatch(remove(props.blog.id))}>Remove</button>
          </li>
        </ul>)
      }
    </li>)
}

export default Blog