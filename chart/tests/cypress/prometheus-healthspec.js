import './login.js'

describe('Basic prometheus', function() {
    it('Visits the prometheus sign in page', function() {
      cy.visit(Cypress.env('prometheus_url'))
      cy.login()
  
      cy.get('div[class="cm-line"]')
        .type('kube_node_info{}')
  
      // Run a query
      cy.get('button[class="execute-btn btn btn-primary"]')
        .click({waitForAnimations: false})
    })

    it('Validate prometheus targets', function() {
      // Make sure we have expected targets.  Some targets may have variable number of instances thus we
      // have to allow for a variable number of running instances.
      cy.wait(5000)
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.get('button[class="mw-100 text-truncate dropdown-toggle btn btn-secondary"]').click()
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-alertmanager\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-coredns\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-grafana\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-apiserver\/0/)
      //cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-istio-envoy\/0/)
      //cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-istio-pilot\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-kube-state-metrics\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-kubelet\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-node-exporter\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-operator\/0/)
      cy.get('button[class="dropdown-item"]').contains(/monitoring\/.+-prometheus\/0/)
    })
})
