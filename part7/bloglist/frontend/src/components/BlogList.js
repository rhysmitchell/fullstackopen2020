import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (<ul>
    {
      blogs.map(blog => <Blog key={blog.id} id={blog.id} blog={blog} />)
    }</ul>)
}

export default BlogList