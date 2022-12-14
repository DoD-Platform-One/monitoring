import './login.js'

before (function() {
  cy.visit(Cypress.env('alertmanager_url'))
  cy.login()
})

describe('Alertmanager unit testing', function() {
  it('Test for grafana index page', function() {
    cy.contains("Expand all groups").click()
    cy.wait(500)
    cy.contains("Collapse all groups").click()
  })
})
