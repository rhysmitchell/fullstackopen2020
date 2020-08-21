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

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(note => note.save());
    await Promise.all(promiseArray);
});


describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('a specific note is within the returned blogs', async () => {
        const response = await api.get('/api/blogs');
        const blogs = response.body.map(blog => blog.title);
        expect(blogs).toContain('Boring blog pt. 1');
    });
});

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const firstBlog = await Blog.findOne({ title: 'Boring blog pt. 1' });

        const resultBlog = await api
            .get(`/api/blogs/${firstBlog._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const processedBlogToView = JSON.parse(JSON.stringify(firstBlog));
        expect(resultBlog.body).toEqual(processedBlogToView);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400);
    });
});

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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

    test('fails with status code 400 if data is invalid', async () => {
        await api
            .post('/api/blogs')
            .send({
                author: 'Not Rhys Mitchell',
                likes: 3
            })
            .expect(400);

        const blogsAfterAdd = await Blog.find({});
        expect(blogsAfterAdd.length).toBe(initialBlogs.length);
    });

    test('id property is named correctly (i.e. not _id)', async () => {
        const response = await api.get('/api/blogs');
        const blogs = response.body;
        blogs.every(blog => expect(blog.id).toBeDefined());
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
    });
});

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogToDelete = await Blog.findOne({ title: 'Boring blog pt. 1' });

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)

        const blogsInDb = await Blog.find({});
        expect(blogsInDb).toHaveLength(initialBlogs.length - 1);

        const titles = blogsInDb.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => mongoose.connection.close());