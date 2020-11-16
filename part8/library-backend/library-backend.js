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
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      let returnableBooks = [];

      if (args.author) {
        returnableBooks = books.filter(book => book.author === args.author)
      }

      if (args.genre) {
        const collectionToFilter = (returnableBooks.length > 0 ? returnableBooks : books)
        returnableBooks = collectionToFilter.filter(book => book.genres.includes(args.genre))
      }

      if (returnableBooks.length > 0) {
        return returnableBooks
      }

      return books
    },
    allAuthors: () => Author.find({}),
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

      newBook = await newBook.populate('author').execPopulate()
      return newBook
    },

    editAuthor: (root, args) => {
      const authorNotSaved = !authors.find(author => author.name === args.name)
      if (authorNotSaved) {
        return null
      }

      authors = authors.map(author => author.name === args.name ? { ...author, name: args.name, born: args.setBornTo } : author)

      return {
        name: args.name,
        born: args.setBornTo,
      }
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