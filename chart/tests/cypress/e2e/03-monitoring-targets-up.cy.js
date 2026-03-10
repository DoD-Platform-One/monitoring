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

  // Create scoped variables so all tests in this block can read them
  let isBigBang = false;
  let promUrl = '';

  before(() => {
    // 1. Fetch the variables asynchronously ONCE before the test suite starts
    cy.env(['bigbang_integration', 'prometheus_url']).then((envVars) => {
      isBigBang = (envVars.bigbang_integration === 'true' || envVars.bigbang_integration === true);
      promUrl = envVars.prometheus_url;
    });
  });

  beforeEach(() => {
    // 2. CRITICAL FIX: Navigate to the page before EVERY test to survive Test Isolation
    if (promUrl) {
      cy.visit(`${promUrl}/targets`);
    }
  });

  it('Validate Prometheus internal metrics are being scraped', function () {
    if (!isBigBang) {
      return this.skip(); // Safely skips this test in the runner if not BigBang
    }
    // No cy.visit needed here anymore, beforeEach handles it
    cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-prometheus/0', variableUpMatch)
    cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-prometheus/1', variableUpMatch)
    cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-operator/0', variableUpMatch)
  });

  it('Validate Prometheus Node Exporter metrics are being scraped', function () {
    if (isBigBang) {
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-prometheus-node-exporter/0', variableUpMatch)
    } else {
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-prometheus-node-exporter/0', variableUpMatch)
    }
  });

  it('Validate Prometheus Kube State Metrics', function () {
    if (isBigBang) {
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-state-metrics/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-coredns/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-apiserver/0', variableUpMatch)
    } else {
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-kube-state-metrics/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-kube-prometheus-coredns/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-kube-prometheus-apiserver/0', variableUpMatch)
    }
  });

  it('Validate Prometheus Kubelet Targets', function () {
    if (isBigBang) {
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-kubelet/0', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-kubelet/1', variableUpMatch)
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-monitoring-kube-kubelet/2', variableUpMatch)
    } else {
      cy.validatePromTargetNew('serviceMonitor/monitoring/monitoring-kube-prometheus-kubelet/0', variableUpMatch)
    }
  });
});

describe('Prometheus Targets Test', () => {
  it('Test should fetch and verify Prometheus targets', () => {

    // API requests don't need cy.visit, so we just wrap it in the variable fetch
    cy.env(['bigbang_integration', 'prometheus_url']).then(({ bigbang_integration, prometheus_url }) => {
      const isBigBang = (bigbang_integration === 'true' || bigbang_integration === true);

      cy.request(`${prometheus_url}/api/v1/targets`).then((response) => {
        const { data } = response.body;
        expect(data).to.have.property('activeTargets');
        expect(data).to.have.property('droppedTargets');

        data.activeTargets.forEach((target) => {
          expect(target).to.have.property('scrapePool');
          expect(target).to.have.property('scrapeUrl');
          expect(target).to.have.property('health');
          expect(target.health).to.be.oneOf(['up', 'down', 'unknown']);
        });

        if (isBigBang) {
          const target = data.activeTargets.find(
            (t) => t.scrapePool === 'serviceMonitor/monitoring/monitoring-monitoring-kube-prometheus/0'
          );
          expect(target).to.exist;
          expect(target.health).to.eq('up');
        } else {
          const target = data.activeTargets.find(
            (t) => t.scrapePool === 'serviceMonitor/monitoring/monitoring-kube-prometheus-prometheus/0'
          );
          expect(target).to.exist;
          expect(target.health).to.eq('up');
        }
      });
    });
  });
});