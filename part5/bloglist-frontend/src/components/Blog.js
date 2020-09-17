import React from 'react';

const Blog = ({ id, blog }) => (
  <li key={id}>
    {blog.title} [by {blog.author}]
  </li>
)

export default Blog;