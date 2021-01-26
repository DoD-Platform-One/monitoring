# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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

