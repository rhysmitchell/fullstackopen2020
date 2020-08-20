const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/Blog');

const initialBlogs = [
    {
        title: 'Boring blog pt. 1',
        author: 'Not Rhys Mitchell',
        url: 'www.boring-blog.com',
        likes: 1
    },
    {
        title: 'Boring blog pt. 2',
        author: 'Not Rhys Mitchell',
        url: 'www.boring-blog.com',
        likes: 2
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});

    initialBlogs.forEach(async (blog) => {
        const newBlog = new Blog(blog);
        await newBlog.save();
    });
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('id property is named correctly (i.e. not _id)', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    blogs.every(blog => expect(blog.id).toBeDefined());
});

test('blog can be created', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'Boring blog pt. 3',
            author: 'Not Rhys Mitchell',
            url: 'www.boring-blog.com',
            likes: 3
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const blogsAfterAdd = await Blog.find({});

    expect(blogsAfterAdd.length).toBe(initialBlogs.length + 1);

    const titles = blogsAfterAdd.map(blog => blog.title);
    expect(titles).toContain('Boring blog pt. 3');
});

test('blog without title and url will not add', async () => {
    await api
        .post('/api/blogs')
        .send({
            author: 'Not Rhys Mitchell',
            likes: 3
        })
        .expect(400)

    const blogsAfterAdd = await Blog.find({});
    expect(blogsAfterAdd.length).toBe(initialBlogs.length);
});

test('blog without likes is defaulted to 0', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'Boring blog pt. 3',
            author: 'Not Rhys Mitchell',
            url: 'www.boring-blog.com'
        });

    const blog = await Blog.findOne({ title: 'Boring blog pt. 3' });
    expect(blog.likes).toBe(0);
})

afterAll(() => mongoose.connection.close());