require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message))


app.get('/', (request, response) =>
    response.send('<h1>Hello World!</h1>')
)

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            console.log(blogs)
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
