describe('Monitoring Targets', {
    // Wait up to 2 minutes (4 sec x 30 attempts) for target to be shown before failing
    retries: {
      runMode: 29,
    }
  }, () => {
      it('Validate Prometheus internal metrics are being scraped', function() {
        cy.visit(`${Cypress.env('prometheus_url')}/targets`)
        cy.validatePromTarget('monitoring-kube-prometheus-prometheus\/0', '(1/1 up)' )
        cy.validatePromTarget('monitoring-kube-prometheus-prometheus\/1', '(1/1 up)' )
        cy.validatePromTarget('monitoring-kube-prometheus-operator\/0', '(1/1 up)' )
      }),
      it('Validate Prometheus Node Exporter metrics are being scraped', function() {
        cy.validatePromTarget('monitoring-prometheus-node-exporter\/0', '(1/1 up)' )
      }),
      it('Validate Prometheus Kube State Metrics', function() {
        cy.validatePromTarget('monitoring-kube-state-metrics\/0', '(1/1 up)' )
        cy.validatePromTarget('monitoring-kube-prometheus-coredns\/0', '(1/1 up)' )
        cy.validatePromTarget('monitoring-kube-prometheus-apiserver\/0', '(1/1 up)' )
      }),
      it('Validate Prometheus Kubelet Targets ', function() {
        cy.validatePromTarget('monitoring-kube-prometheus-kubelet\/0', '(1/1 up)' )
      })
  })
  