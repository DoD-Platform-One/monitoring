describe('Basic prometheus', function() {
  it('Visits the prometheus sign in page', function() {
    
    // Fetch all required variables asynchronously upfront
    cy.env(['prometheus_url', 'keycloak_test_enable', 'tnr_username', 'tnr_password']).then(({ prometheus_url, keycloak_test_enable, tnr_username, tnr_password }) => {
      
      cy.visit(prometheus_url)
      
      // Checks if Keycloak_Test_Enable is set in the tests-value.yaml, should only be run for SSO
      // Note: Env vars often come back as strings. If this evaluates incorrectly, you may need to check for === 'true'
      if (keycloak_test_enable === true || keycloak_test_enable === 'true') {
        cy.performKeycloakLogin(tnr_username, tnr_password)
      } else {
        cy.get('body').then(($body) => {
          if ($body.find('input[name="user"]').length != 0) {
            cy.performGrafanaLogin('admin', 'prom-operator')
          }
        })
      }
      
      cy.wait(200)
      
      cy.get('div[class="cm-line"]')
        .type('kube_node_info{enter}')
      
      // Run a query
      cy.get('button').contains("Execute")
        .click({waitForAnimations: false})
        
    })
  })
})