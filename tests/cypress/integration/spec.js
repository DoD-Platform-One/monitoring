// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

context('Cypress TodoMVC test', () => {
  beforeEach(() => {
    // https://on.cypress.io/visit
    cy.visit('/')
  })

  it('adds 2 todos', function () {
    cy.get('input[name="email"]').type('abc')
  })

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
})
