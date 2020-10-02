import React, { useState } from 'react'

const Blog = ({ id, blog, handleBlogLike, handleBlogDelete }) => {
  const [blogHidden, setBlogHidden] = useState(true)

  return (
    <li className='outer-blog-details' key={id}>
      {blog.title} [by {blog.author}]
      <button className="expand-blog-button" onClick={() => setBlogHidden(!blogHidden)}>{blogHidden ? 'Show' : 'Hide'}</button>
      {!blogHidden &&
        (<ul className='inner-blog-details'>
          <li>{blog.url}</li>
          <li>
            <span className='likes-value'>
              {blog.likes}
            </span>
            <button className='like-button' onClick={() => handleBlogLike(blog)}>Like</button>
          </li>
          <li>{blog.user.name}</li>
          <li>
            <button className='delete-button' onClick={() => handleBlogDelete(blog)}>Remove</button>
          </li>
        </ul>)
      }
    </li>)
}

export default Blog