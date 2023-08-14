describe('Basic prometheus', function() {
    it('Visits the prometheus sign in page', function() {
      cy.visit(Cypress.env('prometheus_url'))
      // Checks if Keycloak_Test_Enable is set in the tests-value.yaml, should only be run for SSO
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
      else {
        cy.task('log', 'skipping sso test...')
        cy.get('body').then(($body) => {
          if ($body.find('input[name="user"]').length != 0) {
            cy.task('log', 'detected login page, logging in with static username and password...')
            cy.get('input[name="user"]')
              .type('admin')
            cy.get('input[name="password"]')
              .type('prom-operator')
            cy.contains("Log in").click()
            cy.get('.page-dashboard')
            cy.task('log', 'app homepage has loaded successfully...')
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
