const listHelper = require('../utils/list_helper')

describe('Blog collection', () => {
  test('at least one blog exists in the collection', () => {
    expect(listHelper.blogsExist(['Blog no. 1', 'Blog no. 2', 'Blog no. 3'])).toBe(true)
  })

  test('Dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})
