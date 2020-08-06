const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('id property is named correctly (i.e. not _id)', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    blogs.map(blog => expect(blog.id).toBeDefined());
});

afterAll(() => mongoose.connection.close());