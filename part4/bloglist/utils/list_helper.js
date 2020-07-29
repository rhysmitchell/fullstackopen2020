const blogsExist = (collection) => collection.length > 0;

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs[0].likes;

const favoriteBlog = (passedBlogs) => {
    const { title, author, likes } = passedBlogs.reduce((prev, current) => (+prev.likes > +current.likes) ? prev : current)

    return {
        title: title,
        author: author,
        likes: likes
    };
}

const mostBlogs = (passedBlogs) => {
    const { author, blogs } = passedBlogs.reduce((prev, current) => (+prev.blogs > +current.blogs) ? prev : current)

    return {
        author: author,
        blogs: blogs
    };
};

module.exports = {
    blogsExist,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}