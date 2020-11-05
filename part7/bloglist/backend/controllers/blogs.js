const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const comments = request.body.comments;

    if (blog) {
        blog.comments = blog.comments.concat(comments);
        await blog.save();

        response.json(blog.toJSON());
    } else {
        response.status(404).end();
    }
});

blogsRouter.post('/', async (request, response) => {

    const body = request.body;

    if (!body.title || !body.url) {
        return response.status(400).end();
    }



    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    });


    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save()
    response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blogToRemove = await Blog.findById(request.params.id);

    if (decodedToken.id !== blogToRemove.user.toString()) {
        return response.status(403).json({ error: 'only the user that created the blog post can delete it' });
    }

    await Blog.findByIdAndRemove(blogToRemove._id);

    const user = await User.findById(decodedToken.id);
    user.blogs = user.blogs.filter(blog => blog._id.toString() != blogToRemove._id.toString())
    await user.save();

    response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
});

module.exports = blogsRouter