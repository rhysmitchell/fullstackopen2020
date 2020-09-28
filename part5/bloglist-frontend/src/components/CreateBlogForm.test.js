import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

test('<CreateBlogForm /> updates parent state and calls onSubmit', () => {
  const user = { username: 'Test User' }

  const handleBlogForm = jest.fn()

  const component = render(
    <CreateBlogForm user={user} handleBlogCreation={handleBlogForm} />
  )

  const expandButton = component.container.querySelector('#BtnCreateBlog')
  fireEvent.click(expandButton)

  const form = component.container.querySelector('#addBlogform')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')


  fireEvent.change(title, {
    target: { value: 'Test title' }
  })

  fireEvent.change(author, {
    target: { value: 'Test name' }
  })

  fireEvent.change(url, {
    target: { value: 'http://www.test-website.com' }
  })

  fireEvent.submit(form)

  expect(handleBlogForm.mock.calls).toHaveLength(1)
  expect(handleBlogForm.mock.calls[0][0].title).toBe('Test title')
  expect(handleBlogForm.mock.calls[0][0].author).toBe('Test name')
  expect(handleBlogForm.mock.calls[0][0].url).toBe('http://www.test-website.com')
})