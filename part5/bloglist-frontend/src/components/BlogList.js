import React from 'react';
import Blog from './Blog';

const BlogList = ({ user, blogs }) => {
    if (!user) {
        return <></>;
    }

    return (<ul>
        {
            blogs.map(blog => <Blog id={blog.id} blog={blog} />)
        }</ul>);
}

export default BlogList;