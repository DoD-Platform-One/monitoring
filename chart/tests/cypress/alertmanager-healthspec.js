before (function() {
  cy.visit(Cypress.env('alertmanager_url'))
  if (Cypress.env('keycloak_test_enable')) {
    cy.task('log', 'logging in via keycloak...')
          cy.get('input[id="username"]')
            .type(Cypress.env('tnr_username'))
            .should('have.value', Cypress.env('tnr_username'));

          cy.get('input[id="password"]')
            .type(Cypress.env('tnr_password'))
            .should('have.value', Cypress.env('tnr_password'));
            
          cy.get('form').submit(); 

          cy.get('input[id="kc-accept"]').click(); 

          cy.get('input[id="kc-login"]').click(); 
          }
//  cy.login()
  cy.wait(200)
})

describe('Alertmanager unit testing', function() {
  it('Test for grafana index page', function() {
    cy.contains("Expand all groups").click()
    cy.wait(500)
    cy.contains("Collapse all groups").click()
  })
})
