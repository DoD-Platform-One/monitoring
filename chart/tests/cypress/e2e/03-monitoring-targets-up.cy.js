describe('Monitoring Targets', {
  // Wait up to 2 minutes (4 sec x 30 attempts) for target to be shown before failing
  retries: {
    runMode: 29,
  }
}, () => {

  const variableUpMatch = /\(([0-9]+)\/\1 up\)/;
  
  if (Cypress.env('bigbang_integration')) {

    it('Validate Prometheus internal metrics are being scraped', function () {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.validatePromTarget('monitoring-monitoring-kube-prometheus\/0', variableUpMatch)
      cy.validatePromTarget('monitoring-monitoring-kube-prometheus\/1', variableUpMatch)
      cy.validatePromTarget('monitoring-monitoring-kube-operator\/0', variableUpMatch)
    }),
    it('Validate Prometheus Node Exporter metrics are being scraped', function () {
      cy.validatePromTarget('monitoring-monitoring-prometheus-node-exporter\/0', variableUpMatch)
    })
    it('Validate Prometheus Kube State Metrics', function () {
      cy.validatePromTarget('monitoring-monitoring-kube-state-metrics\/0', variableUpMatch)
      cy.validatePromTarget('monitoring-monitoring-kube-coredns\/0', variableUpMatch)
      cy.validatePromTarget('monitoring-monitoring-kube-apiserver\/0', variableUpMatch)
    }),
    it('Validate Prometheus Kubelet Targets ', function () {
      cy.validatePromTarget('monitoring-monitoring-kube-kubelet\/0', variableUpMatch)
      cy.validatePromTarget('monitoring-monitoring-kube-kubelet\/1', variableUpMatch)
      cy.validatePromTarget('monitoring-monitoring-kube-kubelet\/2', variableUpMatch)
    })
  }
  else {
    it('Validate Prometheus internal metrics are being scraped', function () {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.validatePromTarget('monitoring-kube-prometheus-prometheus\/0', variableUpMatch)
      cy.validatePromTarget('monitoring-kube-prometheus-prometheus\/1', variableUpMatch)
      cy.validatePromTarget('monitoring-kube-prometheus-operator\/0', variableUpMatch)
    }),
      it('Validate Prometheus Node Exporter metrics are being scraped', function () {
        cy.validatePromTarget('monitoring-prometheus-node-exporter\/0', variableUpMatch)
      }),
      it('Validate Prometheus Kube State Metrics', function () {
        cy.validatePromTarget('monitoring-kube-state-metrics\/0', variableUpMatch)
        cy.validatePromTarget('monitoring-kube-prometheus-coredns\/0', variableUpMatch)
        cy.validatePromTarget('monitoring-kube-prometheus-apiserver\/0', variableUpMatch)
      }),
      it('Validate Prometheus Kubelet Targets ', function () {
        cy.validatePromTarget('monitoring-kube-prometheus-kubelet\/0', variableUpMatch)
      })
  }
})
