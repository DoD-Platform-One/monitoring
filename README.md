<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# monitoring

![Version: 75.6.1-bb.10](https://img.shields.io/badge/Version-75.6.1--bb.10-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: v0.83.0](https://img.shields.io/badge/AppVersion-v0.83.0-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

kube-prometheus-stack collects Kubernetes manifests, Grafana dashboards, and Prometheus rules combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with Prometheus using the Prometheus Operator.

## Upstream References

- <https://github.com/prometheus-operator/kube-prometheus>
- <https://github.com/prometheus-community/helm-charts>
- <https://github.com/prometheus-operator/kube-prometheus>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/README.md#upgrading-chart)
- [and our upstream application release notes here](https://github.com/prometheus-operator/kube-prometheus/blob/main/CHANGELOG.md)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Kubernetes: `>=1.19.0-0`

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install monitoring chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| upstream | object | Upstream chart values | Values to pass to [the upstream kube-prometheus-stack chart](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml) |
| flux.enabled | bool | `false` |  |
| flux.namespace | string | `"flux-system"` |  |
| networkPolicies | object | NetworkPolicy configuration for this package | [bb-common Network Policies configuration](https://repo1.dso.mil/big-bang/product/packages/bb-common/-/blob/main/docs/network-policies/README.md?ref_type=heads) |
| networkPolicies.egress.from.kube-prometheus-stack-prometheus-operator.to.definition.kubeAPI | bool | `true` | The operator must be able to read Prometheus/Alertmanager CRs from the k8s API |
| networkPolicies.egress.from.kube-state-metrics.to.definition.kubeAPI | bool | `true` | Kube-state-metrics derives its metrics from the k8s API |
| networkPolicies.egress.from.prometheus.to.definition.kubeAPI | bool | `true` | Prometheus must be able to read ServiceMonitor and PodMonitor resources from the k8s API |
| networkPolicies.egress.from.prometheus.to.k8s.* | bool | `true` | Prometheus must be able to scrape any workload in the cluster |
| networkPolicies.egress.from.admission-create-job.to.k8s.istio-system/istiod:15012 | bool | `true` | Since this is a pre-install/pre-upgrade job, the default istio egress netpol may not be in effect at the time it runs |
| networkPolicies.egress.from.admission-create-job.to.definition.kubeAPI | bool | `true` | The admission create job needs to be able to create the admission webhooks for prometheus CRDs so it needs access to the k8s API |
| networkPolicies.egress.from.alertmanager.to.cidr."0.0.0.0/0" | bool | `false` | Alertmanager can be configured to integrate with many external alerting systems, so we define this policy but set it to false; set it to true if you need this connectivity |
| openshift | bool | `false` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_prometheus_url | string | `"http://monitoring-kube-prometheus-prometheus:9090"` |  |
| bbtests.cypress.envs.cypress_alertmanager_url | string | `"http://monitoring-kube-prometheus-alertmanager:9093"` |  |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.clusterWideHardenedEnabled | bool | `false` |  |
| istio.hardened.tempo.enabled | bool | `false` |  |
| istio.hardened.tempo.namespaces[0] | string | `"tempo"` |  |
| istio.hardened.tempo.principals[0] | string | `"cluster.local/ns/tempo/sa/tempo-tempo"` |  |
| istio.hardened.loki.enabled | bool | `false` |  |
| istio.hardened.loki.namespaces[0] | string | `"logging"` |  |
| istio.hardened.loki.principals[0] | string | `"cluster.local/ns/logging/sa/logging-loki"` |  |
| istio.hardened.alloy.enabled | bool | `false` |  |
| istio.hardened.alloy.namespaces[0] | string | `"alloy"` |  |
| istio.hardened.alloy.principals[0] | string | `"cluster.local/ns/alloy/sa/alloy-alloy-metrics"` |  |
| istio.namespace | string | `"istio-system"` |  |
| istio.prometheus.enabled | bool | `true` |  |
| istio.prometheus.annotations | object | `{}` |  |
| istio.prometheus.labels | object | `{}` |  |
| istio.prometheus.gateways[0] | string | `"istio-system/main"` |  |
| istio.prometheus.hosts[0] | string | `"prometheus.{{ .Values.domain }}"` |  |
| istio.prometheus.service | string | `""` |  |
| istio.prometheus.port | string | `""` |  |
| istio.prometheus.namespace | string | `""` |  |
| istio.prometheusRule.IstioSidecarMemModerate | bool | `true` |  |
| istio.prometheusRule.IstioSidecarMemHigh | bool | `true` |  |
| istio.prometheusRule.IstioConfigValidationFailed | bool | `true` |  |
| istio.prometheusRule.Istio5XXResponseCode | bool | `true` |  |
| istio.prometheusRule.IstioSidecarEndpointError | bool | `true` |  |
| istio.prometheusRule.IstioSidecarListenerConflict | bool | `true` |  |
| istio.alertmanager.enabled | bool | `true` |  |
| istio.alertmanager.annotations | object | `{}` |  |
| istio.alertmanager.labels | object | `{}` |  |
| istio.alertmanager.gateways[0] | string | `"istio-system/main"` |  |
| istio.alertmanager.hosts[0] | string | `"alertmanager.{{ .Values.domain }}"` |  |
| istio.alertmanager.service | string | `""` |  |
| istio.alertmanager.port | string | `""` |  |
| istio.alertmanager.namespace | string | `""` |  |
| istio.injection | string | `"disabled"` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| istio.console.enabled | bool | `false` |  |
| kiali.enabled | bool | `false` |  |
| sso.enabled | bool | `false` |  |
| sso.selector.key | string | `"protect"` |  |
| sso.selector.value | string | `"keycloak"` |  |
| tempo.enabled | bool | `false` |  |
| cleanUpgrade.enabled | bool | `false` |  |
| cleanUpgrade.image.registry | string | `"registry1.dso.mil"` |  |
| cleanUpgrade.image.repository | string | `"ironbank/big-bang/base"` |  |
| cleanUpgrade.image.tag | string | `"2.1.0"` |  |
| cleanUpgrade.image.sha | string | `""` |  |
| cleanUpgrade.image.imagePullSecrets[0].name | string | `"private-registry"` |  |
| cleanUpgrade.resources.requests.memory | string | `"256Mi"` |  |
| cleanUpgrade.resources.requests.cpu | string | `"100m"` |  |
| cleanUpgrade.resources.limits.memory | string | `"256Mi"` |  |
| cleanUpgrade.resources.limits.cpu | string | `"100m"` |  |
| cleanUpgrade.securityContext.runAsUser | int | `1000` |  |
| cleanUpgrade.securityContext.runAsGroup | int | `1000` |  |
| cleanUpgrade.securityContext.runAsNonRoot | bool | `true` |  |
| cleanUpgrade.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| cleanUpgrade.securityContext.readOnlyRootFilesystem | bool | `true` |  |
| cleanUpgrade.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| blackboxExporter.enabled | bool | `false` |  |
| blackboxExporter.nameOverride | string | `"prometheus-blackbox-exporter"` |  |
| blackboxExporter.global.imageRegistry | string | `"registry1.dso.mil"` |  |
| blackboxExporter.restartPolicy | string | `"Always"` |  |
| blackboxExporter.kind | string | `"Deployment"` |  |
| blackboxExporter.automountServiceAccountToken | bool | `false` |  |
| blackboxExporter.revisionHistoryLimit | int | `10` |  |
| blackboxExporter.hostNetwork | bool | `false` |  |
| blackboxExporter.strategy.rollingUpdate.maxSurge | int | `1` |  |
| blackboxExporter.strategy.rollingUpdate.maxUnavailable | int | `0` |  |
| blackboxExporter.strategy.type | string | `"RollingUpdate"` |  |
| blackboxExporter.image.registry | string | `"registry1.dso.mil"` |  |
| blackboxExporter.image.repository | string | `"ironbank/opensource/prometheus/blackbox_exporter"` |  |
| blackboxExporter.image.tag | string | `"v0.26.0"` |  |
| blackboxExporter.image.pullSecrets[0] | string | `"private-registry"` |  |
| blackboxExporter.securityContext.runAsUser | int | `1000` |  |
| blackboxExporter.securityContext.runAsGroup | int | `1000` |  |
| blackboxExporter.securityContext.readOnlyRootFilesystem | bool | `true` |  |
| blackboxExporter.securityContext.runAsNonRoot | bool | `true` |  |
| blackboxExporter.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| blackboxExporter.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| blackboxExporter.livenessProbe.httpGet.path | string | `"/-/healthy"` |  |
| blackboxExporter.livenessProbe.httpGet.port | string | `"http"` |  |
| blackboxExporter.livenessProbe.failureThreshold | int | `3` |  |
| blackboxExporter.readinessProbe.httpGet.path | string | `"/-/healthy"` |  |
| blackboxExporter.readinessProbe.httpGet.port | string | `"http"` |  |
| blackboxExporter.configExistingSecretName | string | `""` |  |
| blackboxExporter.secretConfig | bool | `false` |  |
| blackboxExporter.config.modules.http_2xx.prober | string | `"http"` |  |
| blackboxExporter.config.modules.http_2xx.timeout | string | `"5s"` |  |
| blackboxExporter.config.modules.http_2xx.http.valid_http_versions[0] | string | `"HTTP/1.1"` |  |
| blackboxExporter.config.modules.http_2xx.http.valid_http_versions[1] | string | `"HTTP/2.0"` |  |
| blackboxExporter.config.modules.http_2xx.http.follow_redirects | bool | `true` |  |
| blackboxExporter.config.modules.http_2xx.http.preferred_ip_protocol | string | `"ip4"` |  |
| blackboxExporter.service.annotations | object | `{}` |  |
| blackboxExporter.service.labels | object | `{}` |  |
| blackboxExporter.service.type | string | `"ClusterIP"` |  |
| blackboxExporter.service.port | int | `9115` |  |
| blackboxExporter.service.ipDualStack.enabled | bool | `false` |  |
| blackboxExporter.service.ipDualStack.ipFamilies[0] | string | `"IPv6"` |  |
| blackboxExporter.service.ipDualStack.ipFamilies[1] | string | `"IPv4"` |  |
| blackboxExporter.service.ipDualStack.ipFamilyPolicy | string | `"PreferDualStack"` |  |
| blackboxExporter.containerPort | int | `9115` |  |
| blackboxExporter.replicas | int | `1` |  |
| blackboxExporter.serviceMonitor.selfMonitor.enabled | bool | `false` |  |
| blackboxExporter.serviceMonitor.selfMonitor.additionalMetricsRelabels | object | `{}` |  |
| blackboxExporter.serviceMonitor.selfMonitor.additionalRelabeling | list | `[]` |  |
| blackboxExporter.serviceMonitor.selfMonitor.labels | object | `{}` |  |
| blackboxExporter.serviceMonitor.selfMonitor.path | string | `"/metrics"` |  |
| blackboxExporter.serviceMonitor.selfMonitor.scheme | string | `"http"` |  |
| blackboxExporter.serviceMonitor.selfMonitor.tlsConfig | object | `{}` |  |
| blackboxExporter.serviceMonitor.selfMonitor.interval | string | `"30s"` |  |
| blackboxExporter.serviceMonitor.selfMonitor.scrapeTimeout | string | `"30s"` |  |
| blackboxExporter.serviceMonitor.enabled | bool | `false` |  |
| blackboxExporter.configReloader.enabled | bool | `false` |  |
| blackboxExporter.configReloader.containerPort | int | `8080` |  |
| blackboxExporter.configReloader.config.logFormat | string | `"logfmt"` |  |
| blackboxExporter.configReloader.config.logLevel | string | `"info"` |  |
| blackboxExporter.configReloader.config.watchInterval | string | `"1m"` |  |
| blackboxExporter.configReloader.image.registry | string | `"registry1.dso.mil"` |  |
| blackboxExporter.configReloader.image.repository | string | `"ironbank/opensource/prometheus-operator/prometheus-config-reloader"` |  |
| blackboxExporter.configReloader.image.tag | string | `"v0.83.0"` |  |
| blackboxExporter.configReloader.image.pullPolicy | string | `"IfNotPresent"` |  |
| blackboxExporter.configReloader.image.digest | string | `""` |  |
| blackboxExporter.configReloader.image.imagePullSecrets[0].name | string | `"private-registry"` |  |
| blackboxExporter.configReloader.securityContext.runAsUser | int | `1000` |  |
| blackboxExporter.configReloader.securityContext.runAsGroup | int | `1000` |  |
| blackboxExporter.configReloader.securityContext.readOnlyRootFilesystem | bool | `true` |  |
| blackboxExporter.configReloader.securityContext.runAsNonRoot | bool | `true` |  |
| blackboxExporter.configReloader.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| blackboxExporter.configReloader.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| blackboxExporter.configReloader.resources.limits.memory | string | `"50Mi"` |  |
| blackboxExporter.configReloader.resources.requests.cpu | string | `"10m"` |  |
| blackboxExporter.configReloader.resources.requests.memory | string | `"20Mi"` |  |
| blackboxExporter.configReloader.service.port | int | `8080` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.additionalMetricsRelabels | object | `{}` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.additionalRelabeling | list | `[]` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.path | string | `"/metrics"` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.scheme | string | `"http"` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.tlsConfig | object | `{}` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.interval | string | `"30s"` |  |
| blackboxExporter.configReloader.serviceMonitor.selfMonitor.scrapeTimeout | string | `"30s"` |  |
| snmpExporter.enabled | bool | `false` |  |
| snmpExporter.image.repository | string | `"registry1.dso.mil/ironbank/opensource/prometheus/snmp_exporter"` |  |
| snmpExporter.image.tag | string | `"v0.29.0"` |  |
| snmpExporter.image.imagePullSecrets[0].name | string | `"private-registry"` |  |
| snmpExporter.configmapReload.image.repository | string | `"registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader"` |  |
| snmpExporter.configmapReload.image.tag | string | `"v0.83.0"` |  |
| snmpExporter.configmapReload.image.imagePullSecrets[0].name | string | `"private-registry"` |  |
| snmpExporter.securityContext.runAsNonRoot | bool | `true` |  |
| snmpExporter.securityContext.runAsUser | int | `1001` |  |
| snmpExporter.securityContext.runAsGroup | int | `1001` |  |
| snmpExporter.securityContext.fsGroup | int | `1001` |  |
| snmpExporter.containerSecurityContext.runAsGroup | int | `1001` |  |
| snmpExporter.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| snmpExporter.containerSecurityContext.runAsUser | int | `1001` |  |
| snmpExporter.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| snmpExporter.serviceMonitor.enabled | bool | `true` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

