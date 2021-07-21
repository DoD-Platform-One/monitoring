# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [11.0.0-bb.27]
### Added
- Grafana dashboard and configmap for Anchore

## [11.0.0-bb.26]
### Added
- Network Policy for allowing egress to all

## [11.0.0-bb.25]
### Added
- Dashboard for Minio

## [11.0.0-bb.25]
### Changed
- Metric path for kubelet From kubernetes 1.18, /metrics/resource/v1alpha1 renamed to /metrics/resource

## [11.0.0-bb.24]
### Changed
- Syntax error in label selector for authservice related network policy template.

## [11.0.0-bb.23]
### Changed
- kubectlImage.repository value, fixing link to IronBank image
- Added OIDC Custom CA fields (commented out), as well as "extraSecretMounts" with example lines (commented out)

## [11.0.0-bb.22]
### Changed
- Enabling Grafana testFramework to allow upgrades from previous package versions to succeed.

## [11.0.0-bb.21]
### Added
- Kiali ingress to grafana Network Policy

## [11.0.0-bb.20]
### Changed
- Migrated tests to gluon library

## [11.0.0-bb.19]
### Added
- Network Policy Values and Templates.

## [11.0.0-bb.18]
### Changed
- Moved CI testing to new helm test infrastructure.

## [11.0.0-bb.15]
### Changed
- Using IronBank equivalents for kube-webhook-certgen, kubectl, and bats images within package.

## [11.0.0-bb.14]
### Changed
- CI pipeline cypress integration testing configuration for new version of cypress

## [11.0.0-bb.13]
## Added
- Prometheus metrics scraping of istio sidecars and components.
- Istio grafana dashboards.

## [11.0.0-bb.12]
### Added
- Ability to modify full hostname, labels, gateways and destination hosts for all VirtualService Resources.
### Changed
- Updating "ingress" value for handling istio virtualservice configuration to wrap under "istio".

## [11.0.0-bb.11]
### Added
* Adding template of grafana configuration values for supplying inline JSON Grafana Dashboards inside the helm chart.
* Documentation for adding Grafana Dashboards via helm values and externally.

### Changed
* Initial update of documentation relevant to bigbang fluxv2 strategies.

## [11.0.0-bb.10]
### Changed
- Updating all dsop.io refs to dso.mil

## [11.0.0-bb.9]
### Added
- Support and outline for configuring Grafana OIDC SSO within the chart values.

### Changed
- KEYCLOAK.md doc, updating process for how to configure Grafana OIDC and utilizing it with Umbrella.
- Cleaning up authservice related portions of KEYCLOAK.md

## [11.0.0-bb.8]

* Added labels and helm values allowing for external podmonitors brought by customers or other packages.

## [11.0.0-bb.7]

* Use ironbank version of `kiwigrid/k8s-sidecar`

## [11.0.0-bb.6]

* Fixing bug in previous release, supplying default for alertmanager+prometheus virtualservice port configurations.

## [11.0.0-bb.5]
### Added
- Top level "sso" values designation. This will enable an haproxy installation in the desired namespace (sso.namespace: monitoring-sso) that in conjunction with authservice package will place an SSO gate in front of Prometheus/Alertmanager UIs.
- Top level "ingress" values designation. This will control configuration for the virtualservices created. Leave empty with sso.enabled = false to have the virtualservices go straight to the alertmanager/prometheus UIs. Leave empty with sso.enabled = true to place the haproxy+authservice injection in front of alertmanager/prometheus. Fill in with your own service/port if customizing the installation/services.

### Changed
- Prometheus+Alertmanager VirtualServices pointing directly to the UIs will be skipped and not created when "sso.enabled: true"

