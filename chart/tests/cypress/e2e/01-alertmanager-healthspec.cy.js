describe('Alertmanager unit testing', function() {
  before(function() {
    // 1. Fetch all variables synchronously from the Gluon backend task
    cy.env(['alertmanager_url', 'keycloak_test_enable', 'tnr_username', 'tnr_password']).then(({ alertmanager_url, keycloak_test_enable, tnr_username, tnr_password }) => {
      
      // 2. Visit the URL
      cy.visit(alertmanager_url)
      
      // 3. Evaluate the SSO flag (checking both boolean and string just in case)
      if (keycloak_test_enable === true || keycloak_test_enable === 'true') {
        cy.performKeycloakLogin(tnr_username, tnr_password)
      }
      
      cy.wait(200)
    })
  })

  it('Test alertmanager UI loads and groups expand', function() {
    cy.contains("Expand all groups").click()
    cy.wait(500)
    cy.contains("Collapse all groups").click()
  })
})