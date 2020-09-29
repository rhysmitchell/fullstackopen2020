describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#loginForm').should('be.visible')
    cy.contains('Login')
  })
})