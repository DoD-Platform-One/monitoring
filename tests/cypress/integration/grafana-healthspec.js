before (function() {
  cy.log(Cypress.env('grafana_url'))
  cy.visit(Cypress.env('grafana_url'))
  cy.get('input[name="user"]')
    .type('admin')
  cy.get('input[name="password"]')
    .type('prom-operator')
  cy.contains("Log in").click()
  //cy.get(".btn-link").contains("Skip").click()
  //cy.wait(9000)
  //cy.get(".dashboard-header").should('be.visible');
  cy.contains('Welcome to Grafana') 

})

describe('Grafana Unit Testing', function() {
    it('Test for grafana Dashboard', function() {
     cy.get(".navbar-page-btn a").click()
     //cy.get(".search-section a.search-item div.search-item__body-title").contains("ArgoCD").click()
     //cy.get("div.navbar-page-btn a").invoke('text').should('eq','ArgoCD ')
   }) 
  })
 
 