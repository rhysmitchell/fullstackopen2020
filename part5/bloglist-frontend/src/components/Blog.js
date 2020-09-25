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

  const handleBlogDelete = async blogToDelete => {
    if (window.confirm(`Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.user.name}?`)) {
      await blogService.deleteBlog(blogToDelete.id);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    }
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
          <li>{blog.user.name}</li>
          <li>
            <button onClick={() => handleBlogDelete(blog)}>Remove</button>
          </li>
        </ul>)
      }
    </li>)
}

export default Blog;