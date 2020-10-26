import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test user',
      url: 'www.test-url.com',
      likes: 5,
      user: {
        name: 'Mr. Test User'
      }
    }

    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} handleBlogLike={mockHandler} />
    )
  })

  test('Initially renders title & author - Not url & likes', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    expect(component.container).toHaveTextContent(
      'Test user'
    )

    const innerBlogDetails = component.container.querySelector('.inner-blog-details')
    expect(innerBlogDetails).toBeFalsy()
  })

  test('Initially renders title & author - renders url & likes on button click', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    expect(component.container).toHaveTextContent(
      'Test user'
    )

    const innerBlogDetails = component.container.querySelector('.inner-blog-details')
    expect(innerBlogDetails).toBeFalsy()

    const button = component.container.querySelector('.expand-blog-button')
    fireEvent.click(button)

    const innerBlogDetailsAfterClick = component.container.querySelector('.inner-blog-details')
    expect(innerBlogDetailsAfterClick).toBeTruthy()
  })

  test('Clicking like button twice will fire event twice', () => {

    const button = component.container.querySelector('.expand-blog-button')
    fireEvent.click(button)

    const likeButton = component.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})