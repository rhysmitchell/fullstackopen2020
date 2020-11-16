const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

mongoose.set('useFindAndModify', false)

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log(`Connected to ${process.env.MONGODB_URI}`))
  .catch((error) => console.log(error.message))

const typeDefs = gql`
    type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
      ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocument(),
    allAuthors: () => Author.find({}),
    allBooks: async (root, args) => {
      let author = null

      if (args.author) {
        author = await Author.findOne({ name: args.author })
      }

      if (!author && args.author) {
        return []
      }

      let filter = {}
      if (args.author) {
        filter = { author: author.id }
      }

      if (args.genre) {
        filter = { genres: { $elemMatch: { $eq: args.genre } } }
      }

      if (args.author && args.genre) {
        filter = {
          author: author.id,
          genres: { $elemMatch: { $eq: args.genre } },
        }
      }

      return await Book.find(filter).populate('author')
    }
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          id: uuid(),
          name: args.author,
        })

        await author.save()
      }

      let newBook = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      })
      await newBook.save()

      return await newBook.populate('author').execPopulate()
    },

    editAuthor: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.name })
      if (!authorExists) {
        return null
      }

      return await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})