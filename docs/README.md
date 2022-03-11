# Monitoring

This repository builds on the following upstream chart [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/charts/kube-prometheus-stack)

## Pre-requisites

* Kubernetes cluster deployed
* kubectl configuration installed
* fluxv2 resources and controllers installed

Install kubectl

```console
brew install kubectl
```

Install flux binary from [https://github.com/fluxcd/flux2/releases](https://github.com/fluxcd/flux2/releases)

## Configuration

Configuration can be done via editing and supplementing the values for the chart which follows the upstream values for [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml)

You can find the API Spec for the Prometheus Operator [here](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md)

### Grafana

By default an admin user with username "admin" and the configured password in the chart at "grafana.adminPassword" is created for logging into the Grafana UI.

#### Adding Dashboards

To supplement the dashboards already provided by the package you can add more dashboards that are automatically loaded into grafana:

##### Via Helm Values

1. Ensure dashboardProviders values are populated (uncommented from package values in this case):

```yaml
monitoring:
  values:
    grafana:
      dashboardProviders:
        dashboardproviders.yaml:
          apiVersion: 1
          providers:
          - name: 'default'
            orgId: 1
            folder: ''
            type: file
            disableDeletion: false
            editable: true
            options:
              path: /var/lib/grafana/dashboards/default
```

1. Populate dashboard JSON you can name in dashboards block like so:

```yaml
monitoring:
  values:
    grafana:
      dashboards:
        default:
          some-dashboard:
            json: |
              $JSON_DATA$
```

* Helm reconciliation will mount the JSON data to the grafana pod and restart, if not delete the grafana pod.

##### Via Configmap

1. Download the JSON file for your dashboard, or ensure you have the config in JSON formatting.
2. Create a secret or configmap like so, where you can include your JSON dashboard configuration inline:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-custom-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  dashboard-name.json: |
    ...
```

*Any configmap in the monitoring namespace with the "grafana_dashboard" : "#" label will be scanned and imported into grafana automatically. This label can be updated in the helm values: grafana.sidecar.dashboards.label: ...
