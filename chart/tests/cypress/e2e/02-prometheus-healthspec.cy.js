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
      // Check Targets
      cy.wait(3000)
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.get('button[class="mw-100 text-truncate dropdown-toggle btn btn-secondary"]').click()
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-alertmanager\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-coredns\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-apiserver\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-kube-state-metrics\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-kubelet\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-node-exporter\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-operator\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-prometheus\/0/)  
    })

})
