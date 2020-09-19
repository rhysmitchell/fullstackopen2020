import React, { useState } from 'react';

const CreateBlogForm = ({ user, handleBlogCreation }) => {
    const [createBlogVisible, setCreateBlogVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault();
        handleBlogCreation({title, author, url});

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    if (!user) {
        return <></>;
    }
    if (createBlogVisible) {
        return (
            <>
                <h3>Create new blog</h3>
                <form onSubmit={addBlog}>
                    <div>
                        Title
                <input
                            type="text"
                            value={title}
                            name="Title"
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        Author
                <input
                            type="text"
                            value={author}
                            name="Author"
                            onChange={(e) => setAuthor(e.currentTarget.value)}
                        />
                    </div>

                    <div>
                        Url
                <input
                            type="text"
                            value={url}
                            name="Url"
                            onChange={(e) => setUrl(e.currentTarget.value)}
                        />
                    </div>
                    <button type="submit">Create</button>
                    <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
                </form>
            </>
        );
    }
    else {
        return (
            <>
                <br />
                <button onClick={() => setCreateBlogVisible(true)}>Create new blog</button>
            </>
        )
    }
};

export default CreateBlogForm;