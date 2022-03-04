# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [32.2.1-bb.1]
### Added
- Added initial set of Redis dashboards
- Added support for the Redis datasource

### Removed
- Removed gitlab dashboards to reduce overall helm chart size -- they now live in the gitlab package

## [32.2.1-bb.0]
### Changed
- Updated Monitoring chart to chart 32.2.1
- Updated image versions to latest in IB (P: v2.33.3 G: 8.3.6 sidecar: 1.15.5, reloader: v0.54.0 operator: v0.54.0)

## [30.0.1-bb.8]
### Changed
- Increase thresholds in the istio-grafana-healthspec cypress test to allow for more charts that show "no data"

## [30.0.1-bb.7]
### Changed
- Update Flux dashboards to upstream v0.26.1 tag

## [30.0.1-bb.6]
### Changed
- Update Flux dashboards

## [30.0.1-bb.5]
### Changed
- Update the big-bang base image from version '8.4' to '1.0.0' in the chart values file

## [30.0.1-bb.4]
### Changed
- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [30.0.1-bb.3]
### Changed
- Updated to latest istio dashboards

## [30.0.1-bb.2]
### Changed
- Added missing security context for kube-state-metrics

## [30.0.1-bb.1]
### Added
- Added OSCAL component for Monitoring

## [30.0.1-bb.0]
### Changed
- Upgrade Monitoring stack to chart 30.0.1

## [23.1.6-bb.7]
### Added
- Added cypress test for istio dashboards in grafana, including tests for charts that contain no data

## [23.1.6-bb.6]
### Changed
- Moved bbtest values to values.yaml

## [23.1.6-bb.5]
### Changed
- `ingress-operator-webhook` NetworkPolicy conditional on webhook being enabled

## [23.1.6-bb.4]
### Added
- `ingress-operator-webhook` NetworkPolicy template to allow flux/kubectl/cluster commands/entities to hit the kube-operator webhook

## [23.1.6-bb.3]
### Added
- Added gitlab-runner grafana dashboards

## [23.1.6-bb.2]
### Changed
- Changed minio dashboard to use Minio.inc MinIO Dashboard

## [23.1.6-bb.1]
### Changed
- Updated securityContext for kube-state-metrics

## [23.1.6-bb.0]
### Changed
- Updated to latest upstream chart 23.1.6
- Updated all images to latest IB (G: 8.3.1, P: 2.31.1, A: 0.23.0)
### Added
- Clean upgrade job added to handle the kube-state-metrics upgrade (deletion of previous deployment/statefulset)
- Package update documentation

## [14.0.0-bb.18]
### Added
- - Grafana dashboard and configmap for Loki

## [14.0.0-bb.17]
### Changed
- Conditionals on AuthorizationPolicy resources. Only required when istio injected.

## [14.0.0-bb.16]
### Changed
- Commented out quay.io/prometheus/node-exporter so that it uses the IB image registry1.dso.mil/ironbank/opensource/prometheus/node-exporter instead.

## [14.0.0-bb.15]
### Added
- Added AuthorizationPolicy for kiali to prometheus
- Added AuthorizationPolicy for monitoring to prometheus

## [14.0.0-bb.14]
### Changed
- Istio based Conditional for the webhook jobs
### Added
- istio.injection value for passthrough from BigBang

## [14.0.0-bb.13]
### Changed
- Remove prometheus sidecar config
- Add authz policy for alertmanager
- Change portName to http-web to support istio-injection

## [14.0.0-bb.12]
### Changed
- Updated package to support istio-injection
- added prometheus sidecar config for istio-injection support
- added containers to terminate istio-proxy when admissionWebhook job completes
- added egress network policy

## [14.0.0-bb.11]
### Changed
- Replaced Grafana default curl with IB curl image

## [14.0.0-bb.10]
### Changed
- Doubled Grafana memory requests/limits

## [14.0.0-bb.9]
### Changed
- Helm dependency chart organization

## [14.0.0-bb.8]
### Changed
- Updated resources for prometheus increased due to OOM errors

## [14.0.0-bb.7]
### Changed
- Updated resources for kube-state-metrics and kube-prometheus-stack due to OOM errors

## [14.0.0-bb.6]
### Added
- Shards value from upstream uncommented to fix intermittent issues with the value not being set

## [14.0.0-bb.5]
### Changed
- Updated resource usage to guaranteed QoS for alert-manager, grafana, sidecar, kube-state-metrics, node-exporter, prometheus-operator and prometheus

## [14.0.0-bb.4]
### Added
- `docs/BBCHANGES.md` to track modifications from upstream charts
### Changed
- pulled in upstream prometheus-node-exporter-1.14.2 chart
- set `.Values.prometheus-node-exporter.hostNetwork` and `.Values.prometheus-node-exporter.hostPID` to `false` in order to resolve OPA violations with prometheus node exporter daemonset

## [14.0.0-bb.3]
### Changed
- SecurityContext configuration for create secret admission webhook job pod

## [14.0.0-bb.2]
### Changed
- SecurityContext configuration for admission-create job pod

## [14.0.0-bb.1]
### Changed
- Updated chart/crds/ folder from upstream kube-prometheus-stack.

## [14.0.0-bb.0]
### Changed
- Updated upstream chart base to 14.0.0 of kube-prometheus-stack
  - Includes changes for Prometheus-Operator, Prometheus, Grafana, and other images.
  - Includes updates to CRDs that need to be manually updated via kubectl apply.

## [11.0.0-bb.28]
### Added
- Grafana dashboard and configmap for Minio

## [11.0.0-bb.27]
### Added
- Grafana dashboard and configmap for Anchore

## [11.0.0-bb.26]
### Added
- Network Policy for allowing egress to all

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
### Added
- Prometheus metrics scraping of istio sidecars and components.
- Istio grafana dashboards.

## [11.0.0-bb.12]
### Added
- Ability to modify full hostname, labels, gateways and destination hosts for all VirtualService Resources.
### Changed
- Updating "ingress" value for handling istio virtualservice configuration to wrap under "istio".

## [11.0.0-bb.11]
### Added
- Adding template of grafana configuration values for supplying inline JSON Grafana Dashboards inside the helm chart.
- Documentation for adding Grafana Dashboards via helm values and externally.

### Changed
- Initial update of documentation relevant to bigbang fluxv2 strategies.

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
### Added
- Added labels and helm values allowing for external podmonitors brought by customers or other packages.

## [11.0.0-bb.7]
### Changed
- Use ironbank version of `kiwigrid/k8s-sidecar`

## [11.0.0-bb.6]
### Fixed
- Fixing bug in previous release, supplying default for alertmanager+prometheus virtualservice port configurations.

## [11.0.0-bb.5]
### Added
- Top level "sso" values designation. This will enable an haproxy installation in the desired namespace (sso.namespace: monitoring-sso) that in conjunction with authservice package will place an SSO gate in front of Prometheus/Alertmanager UIs.
- Top level "ingress" values designation. This will control configuration for the virtualservices created. Leave empty with sso.enabled = false to have the virtualservices go straight to the alertmanager/prometheus UIs. Leave empty with sso.enabled = true to place the haproxy+authservice injection in front of alertmanager/prometheus. Fill in with your own service/port if customizing the installation/services.

### Changed
- Prometheus+Alertmanager VirtualServices pointing directly to the UIs will be skipped and not created when "sso.enabled: true"

## [14.0.0-bb.14]
### Changed
- Commented out quay.io/prometheus/node-exporter so that it uses the IB image registry1.dso.mil/ironbank/opensource/prometheus/node-exporter instead.
