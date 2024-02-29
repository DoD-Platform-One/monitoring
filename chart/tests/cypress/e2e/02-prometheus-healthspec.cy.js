describe('Basic prometheus', function() {
    it('Visits the prometheus sign in page', function() {
      cy.visit(Cypress.env('prometheus_url'))
      // Checks if Keycloak_Test_Enable is set in the tests-value.yaml, should only be run for SSO
      if (Cypress.env('keycloak_test_enable')) {
          cy.performKeycloakLogin(Cypress.env('tnr_username'), Cypress.env('tnr_password'))
          }
      else {
        cy.get('body').then(($body) => {
          if ($body.find('input[name="user"]').length != 0) {
            cy.performGrafanaLogin('admin', 'prom-operator')
          }
        })
      }    
      cy.wait(200)
      cy.get('div[class="cm-line"]')
        .type('kube_node_info{}')
  
      // Run a query
      cy.get('button[class="execute-btn btn btn-primary"]')
        .click({waitForAnimations: false})
    })

})
