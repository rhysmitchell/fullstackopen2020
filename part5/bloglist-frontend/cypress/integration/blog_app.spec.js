describe('Blog app', function () {
  beforeEach(function () {
    cy.ResetDatabase()
    cy.RegisterUser({ name: 'Rhys Mitchell', username: 'rhysmitchell', password: 'password' })
  })

  it('Front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.get('#loginForm').should('be.visible')
    cy.contains('Login')
  })

  it('Valid user can log in', function () {
    cy.Login({ name: 'Rhys Mitchell', username: 'rhysmitchell', password: 'password' })
    cy.contains('Rhys Mitchell is logged in')
  })

  it('Invalid user can\'t log in', function () {
    cy.Logout()
    cy.visit('http://localhost:3000')
    cy.get('#username').type('notrhysmitchell')
    cy.get('#password').type('notpassword')
    cy.get('#BtnLogin').click()
    cy.contains('Login')
  })

  it('A blog can be created', function () {
    cy.Login({ name: 'Rhys Mitchell', username: 'rhysmitchell', password: 'password' })
    cy.get('#BtnCreateBlog').click()

    const blog = {
      title: 'Test blog title',
      author: 'Test blog author',
      url: 'Test blog url'
    }

    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.author)
    cy.get('#BtnSubmitBlog').click()

    cy.get('.expand-blog-button').should('be.visible')
    cy.contains(`${blog.title} [by ${blog.author}]`)
  })

  it('A blog can be liked', function () {
    cy.Login({ name: 'Rhys Mitchell', username: 'rhysmitchell', password: 'password' })
    cy.get('#BtnCreateBlog').click()

    const blog = {
      title: 'Test blog title',
      author: 'Test blog author',
      url: 'Test blog url'
    }

    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.author)
    cy.get('#BtnSubmitBlog').click()

    cy.get('.expand-blog-button').should('be.visible').click()
    cy.get('.like-button').should('be.visible').click()

    cy.get('.likes-value').contains('1')
  })
})