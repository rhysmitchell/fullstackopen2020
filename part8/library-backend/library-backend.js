const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

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

  type User {
    id: ID!
    username: String!
    favouriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Subscription {
    bookAdded: Book!
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

      createUser(
        username: String!
        favouriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
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
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('Invalid password!')
      }

      const token = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(token, process.env.SECRET) }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('User is not authenticated to add books.')
      }

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

      try {
        await newBook.save()
        
        const bookCount = await Book.find({
          author: author.id,
        }).countDocuments()
        
        await Author.findOneAndUpdate(
          { name: author.name },
          { bookCount: bookCount }
        )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const returnableNewBook = await newBook.populate('author').execPopulate()
      pubsub.publish('BOOK_ADDED', { bookAdded: returnableNewBook })

      return returnableNewBook
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('User not authenticated to edit books.')
      }

      let author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      try {
        author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})