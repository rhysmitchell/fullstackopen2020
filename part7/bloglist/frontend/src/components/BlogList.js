import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  if (!user) {
    return null
  }

  return (<ul>
    {
      blogs.map(blog => <Blog key={blog.id} blog={blog} />)
    }</ul>)
}

export default BlogList