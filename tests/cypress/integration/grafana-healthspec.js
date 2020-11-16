before (function() {
  cy.visit(`https://grafana.fences.dsop.io`)
  cy.get('input[name="user"]')
    .type('admin')
    

  cy.get('input[name="password"]')
    .type('admin')
    
  cy.get('.btn').contains("Log In").click()
  cy.get(".btn-link").contains("Skip").click()
  cy.wait(9000)
  cy.get(".dashboard-header").should('be.visible');

  cy.get('.dashboard-header').contains('Welcome to Grafana') 

})

describe('Grafana Unit Testing', function() {
 
 
   it('Test for Argocd Dashboard', function() {
     
 
     cy.get(".navbar-page-btn a").click()
     cy.get(".search-section a.search-item div.search-item__body-title").contains("ArgoCD").click()
     cy.get("div.navbar-page-btn a").invoke('text').should('eq','ArgoCD ')
   }) 
 
   
 })
 
 