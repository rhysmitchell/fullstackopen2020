import React from 'react';
import Blog from './Blog';

const BlogList = ({ user, blogs, setBlogs }) => {
    if (!user) {
        return <></>;
    }

    return (<ul>
        {
            blogs.map(blog => <Blog key={blog.id} id={blog.id} blog={blog} setBlogs={setBlogs} />)
        }</ul>);
}

export default BlogList;