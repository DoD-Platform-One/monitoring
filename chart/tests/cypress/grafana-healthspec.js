import './login.js'

before (function() {
  cy.visit(Cypress.env('grafana_url'))
  cy.login()
})

describe('Grafana Unit Testing', function() {
  it('Test for grafana Dashboard', function() {
    cy.visit(`${Cypress.env('grafana_url')}/dashboards`)
    cy.contains("General").click()
    cy.wait(1000)
    cy.get('h2').contains('Kubernetes / Compute Resources / Cluster').click()
  })
})
