import React from 'react';

const Blog = ({ key, blog }) => (
  <li key={key}>
    {blog.title} {blog.author}
  </li>
)

export default Blog;