import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user, blogs, setBlogs }) => {
  if (!user) {
    return <></>
  }

  const handleBlogLike = async blogToLike => {
    const updatedBlogLikes = blogToLike.likes += 1

    await blogService.update(blogToLike.id, { ...blogToLike, likes: updatedBlogLikes })
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const handleBlogDelete = async blogToDelete => {
    if (window.confirm(`Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.user.name}?`)) {
      await blogService.deleteBlog(blogToDelete.id)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
  }

  return (<ul>
    {
      blogs.map(blog => <Blog key={blog.id} id={blog.id} blog={blog} handleBlogLike={handleBlogLike} handleBlogDelete={handleBlogDelete} />)
    }</ul>)
}

export default BlogList