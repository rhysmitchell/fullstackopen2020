import React, { useState } from 'react';

const Blog = ({ id, blog }) => {
  const [blogHidden, setBlogHidden] = useState(true);

  return (
    <li key={id}>
      {blog.title} [by {blog.author}]
      <button onClick={() => setBlogHidden(!blogHidden)}>{blogHidden ? 'Show' : 'Hide'}</button>
      {!blogHidden &&
        (<ul>
          <li>{blog.url}</li>
          <li>
            {blog.likes}
            <button onClick={() => console.log('Not implemented just yet...')}>Like</button>
          </li>
          <li>{blog?.user?.name || 'Anonymous user'}</li>
        </ul>)
      }
    </li>)
}

export default Blog;