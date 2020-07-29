const blogsExist = (collection) => collection.length > 0;

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs[0].likes;

const favoriteBlog = (blogs) => Math.max.apply(Math, blogs.map(blog => blog.likes));

module.exports = {
    blogsExist,
    dummy,
    totalLikes,
    favoriteBlog
}