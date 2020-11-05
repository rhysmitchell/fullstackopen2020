import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, user }) => {
  if (!user) {
    return null
  }

  return (<ul>
    {
      blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)
    }</ul>)
}

export default BlogList