import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
`

export const ADD_BOOK = gql`
mutation addBook(
  $title: String!
  $published: Int!
  $author: String!
  $genres: [String!]!
) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`


export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}`

export const ME = gql`
  query {
    me {
      username
      favouriteGenre
      id
    }
  }
`

export const ALL_BOOKS = gql`
query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`