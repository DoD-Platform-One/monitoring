Cypress.Commands.add('validatePromTargetNew', (monitorText, match) => {
  cy.get(`input[placeholder*="Select scrape pool"]`)
    .click({force: true})
  cy.get(`div[value="${monitorText}"]`)
    .click({force: true})
  cy.contains(monitorText)
    .should('exist')
  cy.contains(match)
    .should('exist')
})

describe('Monitoring Targets', () => {

  const variableUpMatch = /\d+\s\/\s\d+\sup/;
  
  if (Cypress.env('bigbang_integration')) {

    it('Validate Prometheus internal metrics are being scraped', function () {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-prometheus\/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-prometheus\/1', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-operator\/0', variableUpMatch)
    }),
    it('Validate Prometheus Node Exporter metrics are being scraped', function () {
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-prometheus-node-exporter\/0', variableUpMatch)
    })
    it('Validate Prometheus Kube State Metrics', function () {
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-state-metrics\/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-coredns\/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-apiserver\/0', variableUpMatch)
    }),
    it('Validate Prometheus Kubelet Targets ', function () {
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-kubelet\/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-kubelet\/1', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-monitoring-kube-kubelet\/2', variableUpMatch)
    })
  }
  else {
    it('Validate Prometheus Node Exporter metrics are being scraped', function () {
      cy.visit(`${Cypress.env('prometheus_url')}/targets`)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-prometheus-node-exporter\/0', variableUpMatch)
    }),
    it('Validate Prometheus Kube State Metrics', function () {
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-kube-state-metrics\/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-kube-prometheus-coredns\/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-kube-prometheus-apiserver\/0', variableUpMatch)
    }),
    it('Validate Prometheus Kubelet Targets ', function () {
      cy.validatePromTargetNew('serviceMonitor\/monitoring\/monitoring-kube-prometheus-kubelet\/0', variableUpMatch)
    })
  }
})



describe('Prometheus Targets Test', () => {

  it('Test should fetch and verify Prometheus targets', () => {
    cy.request(`${Cypress.env('prometheus_url')}/api/v1/targets`).then((response) => {
      // Check response status
      expect(response.status).to.eq(200);

      // Validate the structure of the response
      const { data } = response.body;
      expect(data).to.have.property('activeTargets');
      expect(data).to.have.property('droppedTargets');

      // Verify active targets
      data.activeTargets.forEach((target) => {
        expect(target).to.have.property('scrapePool');
        expect(target).to.have.property('scrapeUrl');
        expect(target).to.have.property('health');
        expect(target.health).to.be.oneOf(['up', 'down', 'unknown']);
      });

      if (Cypress.env('bigbang_integration')) {
        // Check for specific targets in BB integration
        const target = data.activeTargets.find(
          (t) => t.scrapePool === 'serviceMonitor/monitoring/monitoring-monitoring-kube-prometheus/0'
        );
        expect(target).to.exist;
        expect(target.health).to.eq('up');
      } else {
        // Check for specific targets on package level
        const target = data.activeTargets.find(
          (t) => t.scrapePool === 'serviceMonitor/monitoring/monitoring-kube-prometheus-prometheus/0'
        );
        expect(target).to.exist;
        expect(target.health).to.eq('up');
      }
    });
  });
});
