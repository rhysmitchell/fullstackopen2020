const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const initialUser = {
    "name": "Initial User",
    "username": "initialuser",
    "password": "password"
};

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

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const login = async () => await api.post('/api/login').send(initialUser);

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const newUser = await api.post('/api/users').send(initialUser);

    const blogObjects = initialBlogs.map(blog => {
        blog.user = newUser.body.id;
        return new Blog(blog);
    });

    const promiseArray = blogObjects.map(blog => blog.save());
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
        const response = await blogsInDb();
        expect(response).toHaveLength(initialBlogs.length);
    });

    test('a specific note is within the returned blogs', async () => {
        const response = await blogsInDb();
        const blogs = response.map(blog => blog.title);
        expect(blogs).toContain('Boring blog pt. 1');
    });
});

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsFromDb = await blogsInDb();
        const blogToView = blogsFromDb[0];

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body.id).toEqual(blogToView.id);
    });


    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await nonExistingId();
        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    });
});

describe('updating a specific blog', () => {
    test('updating author name succeeds', async () => {
        const blogsFromDb = await blogsInDb();
        const blogToView = blogsFromDb[0];

        const updatedBlogToView = { ...blogToView, author: "Might have been Rhys Mitchell" };

        const resultBlog = await api
            .put(`/api/blogs/${updatedBlogToView.id}`)
            .send(updatedBlogToView)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body.author).toEqual(updatedBlogToView.author);
    });
});

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const token = await login();

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token.body.token}`)
            .send({
                title: 'Boring blog pt. 3',
                author: 'Not Rhys Mitchell',
                url: 'www.boring-blog.com',
                likes: 3
            })
            .expect(201)
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
        const blogs = await blogsInDb();
        blogs.every(blog => expect(blog.id).toBeDefined());
    });

    test('blog without likes is defaulted to 0', async () => {
        const token = await login();
        
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token.body.token}`)
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
        const token = await login();
        const blogToDelete = await Blog.findOne({ title: 'Boring blog pt. 1' });

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .set('Authorization', `bearer ${token.body.token}`)
            .expect(204)

        const blogsInDb = await Blog.find({});
        expect(blogsInDb).toHaveLength(initialBlogs.length - 1);

        const titles = blogsInDb.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
});

afterAll(() => mongoose.connection.close());