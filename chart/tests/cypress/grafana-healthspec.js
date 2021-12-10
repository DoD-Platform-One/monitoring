before (function() {
  cy.log(Cypress.env('grafana_url'))
  cy.visit(Cypress.env('grafana_url'))
  cy.get('input[name="user"]')
    .type('admin')
  cy.get('input[name="password"]')
    .type('prom-operator')
  cy.contains("Log in").click()
  cy.contains('Welcome to Grafana') 
})

describe('Grafana Unit Testing', function() {
  it('Test for grafana Dashboard', function() {
    cy.visit(`${Cypress.env('grafana_url')}/dashboards`)
    cy.get('h2').contains('Kubernetes / Compute Resources / Cluster').click()
  })
})
