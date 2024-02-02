before (function() {
  cy.visit(Cypress.env('alertmanager_url'))
  if (Cypress.env('keycloak_test_enable')) {
      cy.performKeycloakLogin(Cypress.env('tnr_username'), Cypress.env('tnr_password'))
          }
  cy.wait(200)
})

describe('Alertmanager unit testing', function() {
  it('Test for grafana index page', function() {
    cy.contains("Expand all groups").click()
    cy.wait(500)
    cy.contains("Collapse all groups").click()
  })
})
