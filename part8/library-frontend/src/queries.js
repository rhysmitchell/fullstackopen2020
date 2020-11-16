import { gql } from '@apollo/client'

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
    title
    author {
      name
      born
    }
    published
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      title
      published
      author {
        name
      }
    }
  }
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