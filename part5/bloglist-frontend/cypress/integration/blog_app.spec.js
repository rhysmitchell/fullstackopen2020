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

    cy.get('.expand-blog-button').should('be.visible')
    cy.get('.expand-blog-button').click()

    cy.get('.like-button').should('be.visible')
    cy.get('.like-button').click()

    cy.get('.likes-value').contains('1')
  })

  it('A blog can be deleted by the user who created it', function () {
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
    cy.get('.expand-blog-button').click()

    cy.get('.like-button').should('be.visible')
    cy.get('.like-button').click()

    cy.get('.delete-button').should('be.visible')
    cy.get('.delete-button').click()

    cy.get('.outer-blog-details').should('not.exist')
  })

  it.only('Blogs are ordered by number of votes', function () {
    cy.Login({ name: 'Rhys Mitchell', username: 'rhysmitchell', password: 'password' })
    cy.get('#BtnCreateBlog').click()

    const blogs = [{
      title: 'Test blog title',
      author: 'Test blog author',
      url: 'Test blog url'
    },
    {
      title: 'Test blog title 2',
      author: 'Test blog author 2',
      url: 'Test blog url 2'
    }]

    blogs.forEach(blog => {
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)

      cy.get('#addBlogform').submit()
    })

    cy.wait(1000)

    cy.get('.expand-blog-button').eq(0).click()
    for (let i = 0; i < 5; i++) {
      cy.get('.like-button').click()

      if (i === 4) {
        cy.get('.expand-blog-button').eq(0).click()
      }
    }

    cy.wait(1000)

    cy.get('.expand-blog-button').eq(1).click()
    for (let i = 0; i < 10; i++) {
      cy.get('.like-button').click()

      if (i === 9) {
        cy.get('.expand-blog-button').eq(1).click()
      }
    }

    cy.wait(1000)
    cy.get('.expand-blog-button').click({ multiple: true })

    cy.get('.title-value').eq(0).contains('Test blog title 2')
    cy.get('.title-value').eq(1).contains('Test blog title')
  })
})