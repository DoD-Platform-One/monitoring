describe('Basic prometheus', function() {
    it('Visits the prometheus sign in page', function() {
      cy.visit(`https://prometheus.fences.dsop.io`)
  
      cy.get('#expr0')
        .type('kube_node_info')
  
      // Run a query
      cy.get('input[name="submit"]')
        .click({waitForAnimations: false})
    })
     
})  