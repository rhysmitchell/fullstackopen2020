import React from 'react';

const CreateBlogForm = ({ user, handleBlogCreation, title, setTitle, author, setAuthor, url, setUrl }) => {
    if (!user) {
        return <></>;
    }
    
    return (
        <form onSubmit={handleBlogCreation}>
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
        </form>
    );
};

export default CreateBlogForm;