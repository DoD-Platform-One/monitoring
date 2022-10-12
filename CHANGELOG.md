# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [40.4.0-bb.1]
### Added
- Prometheus rule for flux alerts

## [40.4.0-bb.0]
### Changed
- Updated Monitoring chart version to `40.4.0`
- Updated images to latest IB image versions: grafana-plugins -> `9.1.6`, k8s-sidecar -> `1.19.5`, bats -> `1.8.0`, kubectl -> `v1.25.2`, prometheus-config-reloader -> `v0.59.2`, node-exporter -> `v1.4.0`, prometheus -> `v2.39.0`

## [40.0.0-bb.2]
### Changed
- Added Istio Operator Service Monitor

## [40.0.0-bb.1]
### Removed
- chart/templates/bigbang/monitors/vault-servicemonitor.yaml

## [40.0.0-bb.0]
### Fixed
- Updated Monitoring chart version to `40.0.0`
- Updated images to latest IB image versions: thanos -> `v0.28.0`, grafana-plugins -> `9.1.3`, kube-state-metrics -> `v2.6.0`
- Updated images to latest IB image versions: kubectl -> `v1.25.0`, prometheus-config-reloader -> `v0.59.0`, prometheus-operator -> `v0.59.0`

## [39.9.0-bb.3]
### Added
- More PrometheusRule resource rule templates for istio ControlPlane and Proxy Alerts

## [39.9.0-bb.2]
### Added
- Grafana Persistence Recommended Values. Including comments and links to upstream.

## [39.9.0-bb.1]
### Fixed
- Fixed a bug in Istio grafana cypress test

## [39.9.0-bb.0]
### Changed
- Updated Monitoring chart version to `39.9.0`
- Updated images to latest IB image versions: kubectl -> `v1.24.3`, grafana-plugins -> `9.1.0`, prometheus -> `v2.38.0`

## [39.2.1-bb.5]
### Changed
- Helm dependency update for Grafana subchart

## [39.2.1-bb.4]
### Added
- Strict mTLS for monitoring

## [39.2.1-bb.3]
### Changed
- Updated images to latest IB image versions: kube-webhook-certgen -> `v1.3.0`, grafan-plugins -> `9.0.6`, -> k8s sidecar -> `v1.19.4`

## [39.2.1-bb.2]
### Changed
- Added containerSecurityContext to values and set drop capabilities

## [39.2.1-bb.1]
### Changed
- Move Istio dashboards out of the monitoring chart
- Delete duplicate servicemonitors

## [39.2.1-bb.0]
### Changed
- Updated to upstream helm chart version 39.2.1
- Updated images to latest IB image versions: prometheus -> `v2.37.0`, thanos -> `v0.27.0`, grafan-plugins -> `9.0.4`, -> prometheus-config-reloader/prometheus-operator -> `v0.58.0`

## [36.2.1-bb.2]
### Changed
- Removed override of `signout_redirect_url` to allow Grafana to handle the URL on its own

## [36.2.1-bb.1]
### Removed
- Grafana Dashboard configs and Templates for Anchore, flux & loki so they can live in their own packages. Dashboards and data will be imported the same way as before.

## [36.2.1-bb.0]
### Changed
- Updated Monitoring chart version to `36.2.1`
- Updated image versions to latest in IB: prometheus -> `v2.36.2`, grafana -> `v9.0.1`

## [35.5.1-bb.2]
### Changed
- Changed the Vault ServiceMonitor to add TLS conditional

## [35.5.1-bb.1]
### Changed
- Relocated all BB templates to subfolders for better organization
- Added a "filter" to the Istio sidecar podmonitor to remove completed pods

## [35.5.1-bb.0]
### Changed
- Updated Monitoring chart version to `35.5.1`
- Updated image versions to latest in IB: prometheus -> `v2.36.0`, grafana -> `v8.6.2`, base -> `1.17.0`, k8s-sidecar -> `v1.19.0`, prometheus-config-reloader -> `v0.57.0`, prometheus-operator -> `v0.57.0`

## [35.2.0-bb.3]
### Added
- PrometheusRule resource for istio sidecar heap Memory alerts

## [35.2.0-bb.2]
### Changed
- Changed job-createSecret and metrics-upgrade-job containers and jobs to run as nonroot

## [35.2.0-bb.1]
### Changed
- Updated version annotation for Grafana
- Updated sidecar and base images to latest in IB

## [35.2.0-bb.0]
### Changed
- Switched Grafana image to IB-BB image with plugins
- Tightened up network policies (less egress anywhere, lock down kube-api access)
- Updated to latest upstream chart + latest IB images

## [35.0.3-bb.0]
### Changed
- Updated Monitoring chart version to `35.0.3`
- Updated image versions to latest in IB: prometheus -> `v2.35.0`, grafana -> `v8.5.2`, base -> `1.2.0`, alertmanager -> `v0.24.0`, k8s-sidecar -> `v1.17.0`, prometheus-config-reloader -> `v0.56.0`, prometheus-operator -> `v0.56.0`
- Fixed OSCAL formatting

## [34.8.0-bb.2]
### Changed
- Removed default search terms on Loki dashboard

## [34.8.0-bb.1]
### Changed
- Split base image into repository and tag

## [34.8.0-bb.0]
### Changed
- Updated Monitoring chart version to `34.8.0`
- Updated image versions to latest in IB:
  - prometheus -> `v2.34.0`
  - grafana -> `8.4.4`
  - k8s-sidecar -> `1.15.9`
  - kube-state-metrics -> `v2.4.2`
  - prometheus-config-reloader -> `v0.55.0`
  - prometheus-operator -> `v0.55.1`
  - thanos -> `v0.26.0`
  
## [33.2.0-bb.3]
### Added
- Added Tempo Zipkin Egress Policy

## [33.2.0-bb.2]
### Removed
- minio grafana dashboards moved to minio package

## [33.2.0-bb.1]
### Added
- Added Vault ServiceMonitor

## [33.2.0-bb.0]
### Changed
- Updated Monitoring chart to chart 32.2.1
- Updated image versions to latest in IB (P: v2.33.4 G: 8.4.2 sidecar: 1.15.7, reloader: v0.54.1 operator: v0.54.1)

## [32.2.1-bb.3]
### Changed
- Added Prometheus Monitoring Document 
- Updated Prometheus Operator document


## [32.2.1-bb.2]
### Changed
- Removed "Universal and flexible dashboard for logging" dashboard
- Added "Loki Dashboard quick search"

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

