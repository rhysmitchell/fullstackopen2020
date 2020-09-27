import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test user',
      url: 'www.test-url.com',
      likes: 5
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('Initially renders title & author - Not url & likes', () => {

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )



    expect(component.container).toHaveTextContent(
      'Test user'
    )

    const innerBlogDetails = component.container.querySelector('#innerBlogDetails')
    expect(innerBlogDetails).toBeFalsy()
  })
})