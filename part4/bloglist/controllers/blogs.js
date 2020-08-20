const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).catch(error => next(error));

    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    });

    const savedBlog = await blog.save().catch(error => next(error));
    response.json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id).catch(error => next(error));
    response.status(204).end();
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).catch(error => next(error))
    response.json(updatedBlog);

})

module.exports = blogsRouter