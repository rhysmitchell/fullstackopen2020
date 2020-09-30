describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Rhys Mitchell',
      username: 'rhysmitchell',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#loginForm').should('be.visible')
    cy.contains('Login')
  })

  it('Valid user can log in', function() {
    cy.contains('Login').click()
    cy.get('#username').type('rhysmitchell')
    cy.get('#password').type('password')
    cy.get('#BtnLogin').click()

    cy.contains('Rhys Mitchell is logged in')
  })

  it('Invalid user can\'t log in', function() {
    cy.contains('Login').click()
    cy.get('#username').type('notrhysmitchell')
    cy.get('#password').type('notpassword')
    cy.get('#BtnLogin').click()

    cy.contains('Login')
  })
})