import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ id, blog, setBlogs }) => {
  const [blogHidden, setBlogHidden] = useState(true);

  const handleBlogLike = async blogToLike => {
    const updatedBlogLikes = blogToLike.likes += 1;

    await blogService.update(blogToLike.id, { ...blogToLike, likes: updatedBlogLikes });
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
  }

  return (
    <li key={id}>
      {blog.title} [by {blog.author}]
      <button onClick={() => setBlogHidden(!blogHidden)}>{blogHidden ? 'Show' : 'Hide'}</button>
      {!blogHidden &&
        (<ul>
          <li>{blog.url}</li>
          <li>
            {blog.likes}
            <button onClick={() => handleBlogLike(blog)}>Like</button>
          </li>
          <li>{blog?.user?.name || 'Anonymous user'}</li>
        </ul>)
      }
    </li>)
}

export default Blog;