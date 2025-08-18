# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [75.6.1-bb.3] (2025-08-18)
### Changed
- Only deploy VirtualService if component(Prometheus/Alertmanager) is enabled

## [75.6.1-bb.2] (2025-07-29)
### Changed
- Set crds.enabled=false by default as CRD creation is now handled by the prometheus-operator-crds chart

## [75.6.1-bb.1] (2025-07-08)
### Changed
- Updated Alloy network policy pod selector

## [75.6.1-bb.0] (2025-06-28)
### Changed
- gluon 0.6.2 -> 0.6.3
- grafana 9.2.2 -> 9.2.9
- kube-prometheus-stack 73.2.0 -> 75.6.1
- kube-state-metrics 5.36.0 -> 6.1.0
- prometheus-blackbox-exporter 10.1.0 -> 11.0.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 12.0.1 -> 12.0.2
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar 1.30.3 -> 1.30.5
- registry1.dso.mil/ironbank/opensource/kubernetes/kube-state-metrics v2.15.0 -> v2.16.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl v1.32.5 -> v1.32.6
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus v3.4.1 -> v3.4.2
- registry1.dso.mil/ironbank/opensource/thanos/thanos v0.38.0 -> v0.39.0

## [73.2.0-bb.0] (2025-06-06)
### Changed
- gluon 0.5.18 -> 0.6.2
- grafana 9.0.0 -> 9.2.2
- kube-prometheus-stack 72.2.0 -> 73.2.0
- kube-state-metrics 5.33.2 -> 5.36.0
- prometheus-blackbox-exporter 9.0.0 -> 10.1.0
- prometheus-node-exporter 4.46.1 -> 4.47.0
- quay.io/prometheus-operator/prometheus-config-reloader v0.82.1 -> v0.83.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 12.0.0 -> 12.0.1
- registry1.dso.mil/ironbank/opensource/bats/bats 1.11.1 -> 1.12.0
- registry1.dso.mil/ironbank/opensource/ingress-nginx/kube-webhook-certgen v1.5.3 -> v1.5.4
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl v1.32.4 -> v1.32.5
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.82.1 -> v0.83.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.82.0 -> v0.83.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.82.1 -> v0.83.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus v3.3.1 -> v3.4.1
- registry1.dso.mil/ironbank/redhat/ubi/ubi9-minimal 9.5 -> 9.6

## [72.2.0-bb.3] (2025-06-02)
### Changed
- Increase kube-state-metrics resource limits/requests to 256Mi

## [72.2.0-bb.2] (2025-05-19)
### Changed
- Moved `blackboxExporter.image.imagePullSecrets` to `blackboxExporter.image.pullSecrets`

## [72.2.0-bb.1] (2025-05-13)
### Changed
- set `blackboxExporter.enabled` to `false` by default

## [72.2.0-bb.0] (2025-05-08)
### Changed
- gluon 0.5.17 -> 0.5.18
- grafana 8.14.2 -> 9.0.0
- kube-prometheus-stack 71.2.0 -> 72.2.0
- quay.io/prometheus-operator/prometheus-config-reloader v0.82.0 -> v0.82.1
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 11.6.1 -> 12.0.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.82.0 -> v0.82.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.82.0 -> v0.82.1

## [71.2.0-bb.1] (2025-05-08)

### Changed
- kube-state-metrics 5.33.0 -> 5.33.1

### Added
- prometheus-blackbox-exporter 9.0.0

### Fixed
- typo bug in flux-podmonitor

## [71.2.0-bb.0] (2025-05-03)

### Changed
- gluon 0.5.15 -> 0.5.17
- grafana 8.12.1 -> 8.14.2
- kube-prometheus-stack 70.7.0 -> 71.2.0
- kube-state-metrics 5.32.0 -> 5.33.0
- prometheus-node-exporter 4.45.3 -> 4.46.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 11.6.0 -> 11.6.1
- registry1.dso.mil/ironbank/opensource/ingress-nginx/kube-webhook-certgen v1.5.2 -> v1.5.3
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl v1.32.3 -> v1.32.4
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.81.0 -> v0.82.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus v3.2.1 -> v3.3.1
- registry1.dso.mil/ironbank/opensource/prometheus/snmp_exporter v0.28.0 -> v0.29.0

## [70.7.0-bb.0] (2025-04-19)

### Changed

- grafana 8.11.4 -> 8.12.1
- kube-prometheus-stack 70.4.1 -> 70.7.0
- kube-state-metrics 5.31.2 -> 5.32.0
- prometheus-windows-exporter 0.9.2 -> 0.10.0
- quay.io/prometheus-operator/prometheus-config-reloader v0.81.0 -> v0.82.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl v1.30.11 -> v1.32.3
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.81.0 -> v0.82.0
- registry1.dso.mil/ironbank/opensource/prometheus/node-exporter v1.9.0 -> v1.9.1
- registry1.dso.mil/ironbank/opensource/thanos/thanos v0.37.2 -> v0.38.0

## [70.4.1-bb.0] 2025-04-01

### Updated

- Updated gluon 0.5.14 -> 0.5.15
- Updated grafana-plugins 11.5.2 -> 11.6.0
- Updated k8s-sidecar 1.30.0 -> 1.30.3
- Updated kube-webhook-certgen v1.5.1 -> v1.5.2
- Updated kubectl v1.30.10 -> v1.30.11
- Updated prometheus-config-reloader v0.80.1 -> v0.81.0
- Updated prometheus-operator v0.80.1 -> v0.81.0
- Updated alertmanager v0.28.0 -> v0.28.1

## [69.7.3-bb.1] - 2025-03-19

### Added

- Added Network Policies & Authorization Policy to support Alloy integration with Prometheus.

## [69.7.3-bb.0] - 2025-03-05

### Updated

- Updated grafana-plugins 11.4.0 -> 11.5.2
- Updated k8s-sidecar 1.29.0 -> 1.30.0
- Updated kube-state-metrics v2.14.0 -> v2.15.0
- Updated kubectl v1.30.9 -> v1.30.10
- Updated prometheus-config-reloader v0.79.2 -> v0.80.1
- Updated prometheus-operator v0.79.2 -> v0.80.1
- Updated alertmanager v0.27.0 -> v0.28.0
- Updated node-exporter v1.8.2 -> v1.9.0
- Updated prometheus v3.1.0 -> v3.2.1
- Updated snmp_exporter v0.27.0 -> v0.28.0

## [67.11.0-bb.2] - 2025-02-07

### Added

- Added Network Policies & Authorization Policy to support Loki integration with Prometheus/AlertManager.

## [67.11.0-bb.1] - 2025-01-29

### Updated

- Added support for istio Operatorless network policy values

## [67.11.0-bb.0] - 2025-01-17

### Updated

- Updated gluon 0.5.12 -> 0.5.14
- Updated k8s-sidecar 1.28.4 -> 1.29.0
- Updated kube-webhook-certgen v1.5.0 -> v1.5.1
- Updated kubectl v1.30.8 -> v1.30.9
- Updated prometheus v3.0.1 -> v3.1.0
- Updated snmp_exporter v0.26.0 -> v0.27.0
- Updated grafana 8.8.2 -> 8.8.4
- Updated windows_exporter v0.7.0 -> v0.8.0

## [67.9.0-bb.0] - 2025-01-09

### Updated

- Updated grafana-plugins: 11.3.1 -> 11.4.0
- Updated prometheus-config-reloader: v0.78.2 -> v0.79.2
- Updated prometheus-operator: v0.78.2 -> v0.79.2
- Updated k8s-sidecar: 1.28.0 -> 1.28.4
- Updated kube-webhook-certgen: v1.4.4 -> v.1.5.0
- Updated kubectl: v1.30.7 -> v1.30.8
- Updated thanos: v0.37.1 -> v0.37.2
- Updated kube-state-metrics: 5.27.0 -> 5.28.0
- Updated grafana: 8.6.4 -> 8.8.2
- Updated prometheus-node-exporter: 4.42.0 -> 4.43.1

## [66.3.1-bb.0] - 2024-12-06

### Updated

- Updated Grafana: 11.1.0 -> 11.2.2
- Updated grafana-plugins: 11.1.0 -> 11.2.2
- Updated prometheus-config-reloader: v0.71.2 -> v0.78.2
- Updated prometheus-operator: v0.74.0 -> v0.78.2
- Updated kube-state-metrics chart: v2.12.0 -> v2.14.0
- Updated prometheus-node-exporter chart: v1.8.1 -> v1.8.2
- Updated prometheus-snmp-exporter chart: 5.5.0 -> 5.6.0

## [62.4.0-bb.1] - 2024-11-04

### Changed
- Changed Gluon: 0.5.0 -> 0.5.9
- Changed cypress tests to check for variable number of running pods
- Changed Grafana: 8.5.1 -> 8.5.12
- Added the maintenance track annotation and badge

## [62.4.0-bb.0] - 2024-08-20

### Updated

- Updated `kube-prometheus-stack` from `62.1.0` -> `62.4.0`
- Updated `grafana` from `8.3.8` -> `8.5.1`
- Updated `kube-state-metrics` from `5.22.1` -> `5.25.1`
- Updated `prometheus-node-exporter` from `4.38.0` -> `4.39.0`
- Updated `prometheus-windows-exporter` from `0.3.1` -> `0.5.2`

## [62.1.0-bb.0] - 2024-08-20

### Updated

- Updated `kube-prometheus-stack` from `61.2.0` -> `62.1.0`

## [61.2.0-bb.5] - 2024-08-13

### Updated

- Updated templating for `podMetadata` to consistently use `tpl`
- Updated versions of prometheus-node-exporter and kube-state-metrics after submitting upstream PRs to update templating to use `tpl`

## [61.2.0-bb.4] - 2024-08-05

### Fixed

- Use global imagePullSecret Only

## [61.2.0-bb.3] - 2024-08-01

### Changed

- Remove redundant items from test/test-values.yaml

## [61.2.0-bb.2] - 2024-07-29

### Updated

- Auth policy to allow prometheus to scrape when sso is enabled, but hardening is not.

## [61.2.0-bb.1] - 2024-07-29

### Updated

- Adding a label selector to the shared auth policies to allow prometheus to scrape when sso is enabled, but hardening is not.

## [61.2.0-bb.0] - 2024-07-15

### Updated

- Updated Grafana: 11.0.0 -> 11.1.0
- Updated grafana-plugins: 11.0.0 -> 11.1.0
- Updated prometheus-config-reloader: v0.74.0 -> v0.75.0
- Updated prometheus-operator: v0.74.0 -> v0.75.0
- Updated kube-state-metrics chart: 5.20.1 -> 5.21.0
- Updated prometheus-node-exporter chart: 4.36.0 -> 4.37.0
- Updated grafana chart: 8.0.2 -> 8.3.2
- Updated prometheus-snmp-exporter chart: 5.4.0 -> 5.5.0

### Fixed

- Restored missing authPolicy required for Grafana<->Prometheus communication with SSO enabled.

## [60.4.0-bb.5] - 2024-07-11

### Removed

- Removed AlertManager peerAuthentication policy and enabled TLS connection to AlertManager

## [60.4.0-bb.4] - 2024-07-09

### Added

- Added kiali authPolicy to allow graph building

## [60.4.0-bb.3] - 2024-07-05

### Removed

- Removed shared authPolicies set at the Istio level

## [60.4.0-bb.2]

### Fixed

- Resolved URL issue between Prometheus and Alertmanager

## [60.4.0-bb.1] (2024-06-28)

### Added

- Added prometheus-snmp-exporter: v0.26.0
- Updated kube-state-metrics: 5.20.0 -> 5.20.1

## [60.4.0-bb.0] (2024-06-26)

### Updated

- Updated kubectl: v1.29.5 -> v1.29.6
- Updated prometheus: v2.52.0 -> v2.53.0

## [60.1.0-bb.0] (2024-06-13)

### Updated

- Updated node-exporter: v1.8.0 -> v1.8.1
- Updated thanos: v0.35.0 -> v0.35.1
- Updated kube-state-metrics chart: 5.19.x -> 5.20.x
- Updated prometheus-node-exporter chart: 4.34.x -> 4.36.x
- Updated grafana chart: 7.3.*-> 8.0.*

## [59.1.0-bb.1] (2024-06-06)

### Updated

- Moved the shared monitoring policy into the monitoring chart

## [59.1.0-bb.0] (2024-06-06)

### Updated

- Chart's appVersion synchronized with upstream chart

## [58.6.1-bb.0] (2024-05-31)

### Updated

- Updated k8s-sidecar: 1.27.1 -> 1.27.2

## [58.6.0-bb.0] (2024-05-21)

### Updated

- Updated prometheus-config-reloader: v0.73.2 -> v0.74.0
- Updated prometheus-operator: v0.73.2 -> v0.74.0

## [58.5.3-bb.1] (2024-05-17)

### Added

- Added additional namespace and port for hardened thanos

## [58.5.3-bb.0] (2024-05-16)

### Updated

- Updated Grafana: 10.4.2 -> 11.0.0
- Updated k8s-sidecar: 1.26.2 -> 1.27.1
- Updated kubectl: v1.29.4 -> v1.29.5

## [58.5.1-bb.0] (2024-05-14)

### Updated

- Updated Prometheus: 2.51.2 -> 2.52.0

## [58.4.1-bb.0] (2024-05-09)

### Updated

- kiwigrid/k8s-sidecar 1.26.1 -> 1.26.2
- thanos/thanos v0.34.1 -> v0.35.0
- prometheus/node_exporter 4.33.*-> 4.34.*

## [58.3.3-bb.0] (2024-05-03)

### Updated

- Updated Gluon: 0.4.10 -> 0.5.0
- Updated prometheus/node-exporter: v1.7.0 -> v1.8.0
- Updated ubi9-minimal 9.3 -> 9.4

## [58.3.1-bb.0] (2024-05-01)

### Updated

- Updated kubectl: 1.29.4
- Updated prometheus-config-reloader: v0.73.2
- Updated prometheus-operator: v0.73.2
- Updated prometheus-node-exporter: 4.33.0

## [58.2.2-bb.0] (2024-04-24)

### Updated

- Updated Monitoring chart to v0.73.2
- Updated Prometheus: 2.51.2
- Updated Grafana: 10.4.2
- Updated kube-state-metrics 5.18.0 -> 5.19.0

## [58.0.0-bb.1] (2024-04-19)

### Fixed

- Fix Kiali connection issues due to AuthPols

## [58.0.0-bb.0] (2024-04-15)

### Updated

- Updated Monitoring chart to v0.73.0
- Updated Prometheus: 2.51.1
- Updated Gluon: 0.4.9
- Updated AlertManager: 0.27.0

## [57.2.0-bb.2] (2024-04-10)

### Fixed

- Fix IngressGateway Authorization Policies for AlertManager and Prometheus VirtualServices

## [57.2.0-bb.2] (2024-04-10)

### Fixed

- Fix IngressGateway Authorization Policies for AlertManager and Prometheus VirtualServices

## [57.2.0-bb.1] (2024-04-05)

### Added

- Custom network policies

## [57.2.0-bb.0] - 2024-04-03

### Updated

- Updated chart 57.0.3 -> 57.2.0
- Updated grafana-plugins 10.4.0 -> 10.4.1
- Updated kube-state-metrics 2.10.1 -> 2.11.0
- Updated prometheus 2.50.1 -> 2.51.1

## [57.0.3-bb.2] - 2024-04-02

### Updated

- Updated admissionWebhooks containers to support global.imageRegistry

## [57.0.3-bb.1] - 2024-03-27

### Updated

- Added istio Sidecar and ServiceEntry resources

## [57.0.3-bb.0] - 2024-03-20

### Updated

- Updated chart 56.2.1 -> 57.0.3
- Updated grafana-plugins 10.3.1 -> 10.4.0
- Updated k8s-sidecar 1.25.3 -> 1.26.1
- Updated kubectl v1.28.6 -> v1.28.8
- Updated prometheus-config-reloader v0.71.2 -> v0.72.0
- Updated prometheus-operator v0.71.2 -> v0.72.0
- Updated alertmanager v0.26.0 -> v0.27.0
- Updated prometheus v2.49.1 -> v2.50.1
- Updated thanos v0.33.0 -> v0.34.1
- Updated bats v1.10.0 -> v1.11.0

## [56.2.1-bb.10] - 2024-03-08

### Updated

- Openshift update for deploying Monitoring into Openshift cluster

## [56.2.1-bb.9] - 2024-03-04

### Updated

- Cypress upgrade for bigbang and package CI

## [56.2.1-bb.8] - 2024-03-04

### Updated

- removing the sso.enabled from a bunch of authorization policies that didn't need it

## [56.2.1-bb.7] - 2024-03-04

### Updated

- fixed ingress gateway auth policies
- fixed monitoring auth policy
- added intra namespace auth policy

## [56.2.1-bb.6] - 2024-02-29

### Updated

- Enhance Cypress tests to ensure the prometheus targets are actually up

## [56.2.1-bb.5] - 2024-02-29

### Updated

- Split and fixed ingress policies
- Renamed some policies for clarity

## [56.2.1-bb.4] - 2024-02-28

### Updated

- Moved auth policies to shared location
- renamed the allow-nothing-policy

## [56.2.1-bb.3] - 2024-02-27

### Updated

- Updated CleanUpgrade, cleanupProxy, kubectlImage containers to support global.imageRegistry

## [56.2.1-bb.2] - 2024-02-26

### Updated

- Create PeerAuthentication exception for prometheus if more than one replica is set

## [56.2.1-bb.1] - 2024-02-02

### Updated

- Updated gluon to 4.8 to allow for custom scripts

## [56.2.1-bb.0] - 2024-01-29

### Updated

- Updated Monitoring chart from 56.0.3-bb.0 to 56.2.1-bb.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 10.2.3 -> 10.3.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader 0.71.0 -> v0.71.2
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.71.0 -> v0.71.2
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator 0.71.0 -> v0.71.2

## [56.0.3-bb.0] - 2024-01-22

### Updated

- Monitoring chart version 55.5.1-bb.1 -> 56.0.3-bb.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 10.2.2 -> 10.2.3
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl v1.28.4 -> v1.28.6
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.70.0 -> v0.71.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.70.0 -> v0.71.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus v2.48.1 -> v2.49.1
- registry1.dso.mil/ironbank/opensource/thanos/thanos v0.32.5 -> v0.33.0

## [55.5.1-bb.1] - 2024-1-05

### Added

- Added istio `allow-nothing` policy
- Added istio `allow-ingress` polic(y|ies)
- Added istio `allow-tempo` policy
- Added istio custom policy template

## [55.5.1-bb.0] - 2023-12-28

### Updated

- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar 1.25.2 -> 1.25.3
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus v2.48.0 -> v2.48.1

## [55.0.0-bb.2] - 2023-12-15

### Updated

- Updated `ubi8-minimal:8.9` to `ubi9-minimal:9.3`

## [55.0.0-bb.1] - 2023-12-07

### Updated

- Bug fix where AlertmanagerClusterDown alert fires although the alertmanager is healthy.
- Added an additional NetworkPolicy to facilitate the fix for alertmanager's reloader-web
- Added an additional port to the authorization and peerauthentication policies

## [55.0.0-bb.0] - 2023-12-4

### Changed

- Updated chart version to 55.0.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 10.1.5 -> 10.2.2
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.69.1 -> v0.70.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.69.1 -> v0.70.0

## [52.1.0-bb.2] - 2023-11-22

### Changed

- Allowing consumers to choose to disable all or certain bigbang istio prometheus alert rules. (.Values.istio.prometheusRule.x)

## [52.1.0-bb.1] - 2023-11-21

### Updated

- registry1.dso.mil/ironbank/big-bang/base 2.0.0 -> 2.1.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kube-state-metrics v2.10.0 -> v2.10.1
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl v1.28.3 -> v1.28.4
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader v0.68.0 -> v0.69.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator v0.68.0 -> v0.69.1
- registry1.dso.mil/ironbank/opensource/prometheus/node-exporter v1.6.1 -> v1.7.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus v2.47.2 -> v2.48.0
- registry1.dso.mil/ironbank/redhat/ubi/ubi8-minimal 8.8 -> 8.9

## [52.1.0-bb.0] - 2023-11-2

### Changed

- upgrade chart version to 52.1.0
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins 10.0.3 -> 10.1.5
- upgrading gluon from 0.4.1 to 0.4.4

## [51.10.0-bb.2] - 2023-11-01

### Added

- automountServiceAccountToken to false for AlertManager (unnecessary token)

## [51.10.0-bb.1] - 2023-11-01

### Added

- Added AuthorizationPolicy for Thanos to connect to prometheus-thanos sidecar

## [51.10.0-bb.0] - 2023-10-20

### Changed

- upgrade chart version to 51.10.0
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar patch 1.25.1 -> 1.25.2
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl 1.28.2 -> v1.28.1
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus minor v2.47.0 -> v2.47.2
- registry1.dso.mil/ironbank/opensource/thanos/thanos minor v0.32.3 -> v0.32.5

## [51.1.0-bb.5] - 2023-10-19

### Added

- adding network policy to allow alert manager to send alerts to external endpoints.

## [51.1.0-bb.4] - 2023-10-18

### Changed

- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl 1.28.1 -> v1.28.2

## [51.1.0-bb.3] - 2023-10-16

### Added

- Added NetworkPolicy for Thanos to connect to Prometheus-Thanos-Sidecar

## [51.1.0-bb.2] - 2023-10-11

### Changed

- Update OSCAL version from 1.0.0 to 1.1.1

## [51.1.0-bb.1] - 2023-10-03

### Changed

- Add delay before sidecar proxy kill for monitoring jobs

## [51.1.0-bb.0] - 2023-09-26

### Changed

- upgrade chart version to 51.1.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kube-state-metrics minor v2.9.2 -> v2.10.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl patch 1.27.5 -> 1.28.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader  minor v0.67.1 -> v0.68.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator minor v0.67.1 -> v0.68.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus minor v2.46.0 -> v2.47.0
- registry1.dso.mil/ironbank/opensource/thanos/thanos minor v0.32.1 -> v0.32.3
- Updated gluon from 0.4.0 to 0.4.1
- Updated cypress folder structure to accommodate cypress 13.X+

## [49.2.0-bb.1] - 2023-09-25

### Changed

- changed defaultpeerauthentication from a hardcoded value to use {{ .Release.Namespace }}

## [49.2.0-bb.0] - 2023-08-31

### Changed

- upgrade chart version to 49.2.0
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar patch 1.25.0 -> 1.25.1

## [48.3.1-bb.1] - 2023-08-02

### Changed

- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins patch 10.0.2 -> 10.0.3
- registry1.dso.mil/ironbank/opensource/kubernetes/kube-state-metrics minor v2.8.2 -> v2.9.2
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl patch 1.27.4 -> 1.27.5
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader  minor v0.66.0 -> v0.67.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator minor v0.66.0 -> v0.67.1
- registry1.dso.mil/ironbank/opensource/prometheus/alertmanager minor v0.25.0 -> v0.26.0
- registry1.dso.mil/ironbank/opensource/thanos/thanos minor v0.31.0 -> v0.32.1

## [48.3.1-bb.0] - 2023-08-02

### Changed

- kube-prometheus-stack upgraded to 48.3.1
- removed duplicated CRDs

## [48.2.3-bb.0] - 2023-08-02

### Changed

- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins major 9.5.3 -> 10.0.2
- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins patch 10.0.1 -> 10.0.2
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar minor 1.24.4 -> 1.25.0
- registry1.dso.mil/ironbank/opensource/bats/bats minor 1.9.0 -> v1.10.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl patch 1.27.3 -> 1.27.4
- registry1.dso.mil/ironbank/opensource/prometheus/node-exporter patch v1.6.0 -> v1.6.1
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus minor v2.45.0 -> v2.46.0

## [47.1.0-bb.2] - 2023-07-31

### Added

- cap drop ALL to clean upgrade

## [47.1.0-bb.1] - 2023-07-21

### Changed

- grafana disabled by default

### Removed

- Grafana related BigBang templates

## [47.1.0-bb.0] - 2023-06-27

### Added

- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins major 9.5.1 -> 9.5.3
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar minor 1.23.3 -> 1.24.4
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl minor v1.26.4 -> 1.27.3
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader minor v0.65.1 -> v0.66.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator minor v0.65.1 -> v0.66.0
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operato minor 0.65.1 -> v0.66.0
- registry1.dso.mil/ironbank/opensource/prometheus/node-exporter minor v1.5.0 -> v1.6.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus minor v2.42.0 -> v2.45.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus minor v2.43.1 -> v2.45.0
- registry1.dso.mil/ironbank/opensource/thanos/thanos minor v0.30.2 -> v0.31.0
- registry1.dso.mil/ironbank/redhat/ubi/ubi8-minimal minor 8.7 -> 8.8

## [45.27.2-bb.4] - 2023-05-26

### Added

- Added Openshift support

## [45.27.2-bb.3] - 2023-05-19

### Added

- Fix attachMetadata section in node exporter

## [45.27.2-bb.2] - 2023-05-17

### Added

- updated cypress tests

## [45.27.2-bb.1] - 2023-05-16

### Added

- updated cypress tests

## [45.27.2-bb.0] - 2023-05-11

### Added

- registry1.dso.mil/ironbank/big-bang/grafana/grafana-plugins minor 9.3.2 -> 9.5.1
- registry1.dso.mil/ironbank/kiwigrid/k8s-sidecar minor 1.21.0 -> 1.23.3
- registry1.dso.mil/ironbank/opensource/bats/bats minor 1.8.2 -> 1.9.0
- registry1.dso.mil/ironbank/opensource/kubernetes/kube-state-metrics minor v2.7.0 -> v2.8.2
- registry1.dso.mil/ironbank/opensource/kubernetes/kubectl minor v1.25.5 -> v1.26.4
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader minor v0.61.1 -> v0.65.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator minor v0.61.1 -> v0.65.1
- registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-operator minor 0.61.1 -> v0.65.1
- registry1.dso.mil/ironbank/opensource/prometheus/alertmanager minor v0.24.0 -> v0.25.0
- registry1.dso.mil/ironbank/opensource/prometheus/prometheus minor v2.40.5 -> v2.42.0
- registry1.dso.mil/ironbank/opensource/thanos/thanos minor v0.29.0 -> v0.30.2

## [43.1.2-bb.5] - 2022-05-08

### Added

- Added AuthorizationPolicy for tempo to prometheus

## [43.1.2-bb.4] - 2022-03-15

### Added

- Updated chart name to monitoring

## [43.1.2-bb.3] - 2022-02-28

### Added

- NetworkPolicy template for tempo ingress to facilitate remote metrics write publishing

## [43.1.2-bb.2] - 2022-02-08

### Changed

- Changed thanos reference to IronBank in annotations

## [43.1.2-bb.1] - 2022-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [43.1.2-bb.0]

### Changed

- Updated Monitoring chart to 43.1.2 and Updated image versions to latest in IB
- Prometheus: 2.40.5
- Grafana: 9.3.2
- Alertmanager: 0.24.0
- k8s-sidecar image held at 1.19.5 due to issues w/ 1.21.0

## [41.7.3-bb.1]

### Added

- Grafana and prometheus cypress tests can now log in with keycloak SSO
- Added cypress test for the alertmanager UI w/SSO login

## [41.7.3-bb.0]

### Added

- Updated Monitoring chart version to `41.7.3`

## [41.5.0-bb.1]

### Added

- `9094` AuthorizationPolicy exception for Alertmanager (port for multi-replica sync)

### Changed

- Uncommented `prometheusOperator.clusterDomain` value for better internal resolving of monitoring installation

## [41.5.0-bb.0]

### Added

- Updated Gluon to `3.1.0`
- Updated Monitoring chart version to `41.5.0`
- Updated images to latest IB image versions: thanos -> `v0.28.1`, grafana-plugins -> `9.2.0`, kubectl -> `v1.25.3`, prometheus-config-reloader -> `v0.60.1`, prometheus-operator -> `v0.60.1`

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
