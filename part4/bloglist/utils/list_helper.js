const blogsExist = (collection) => collection.length > 0;

const dummy = (blogs) => 1;

const totalLikes = (array) => array[0].likes;

module.exports = {
    blogsExist,
    dummy,
    totalLikes
}