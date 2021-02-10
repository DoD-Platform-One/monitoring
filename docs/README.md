# Monitoring - kube-prometheus-stack version 11

This repository builds on the following upstream chart [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/charts/kube-prometheus-stack) version 11.

If you are looking to update the resources in this repo, grab the new manifests from the release branch and integrate it.

Be sure to update kustomization.yaml as needed.

### Pre-requisites

* Kubernetes cluster deployed
* kubectl configuration installed
* fluxv2 resources and controllers installed

Install kubectl

```
brew install kubectl
```

Install flux binary from https://github.com/fluxcd/flux2/releases

By default an admin user with username "admin" and the configured password in the chart at "grafana.adminPassword" is created for logging into the Grafana UI.

## Configuration

Configuration can be done via editing and supplementing the values for the chart which follows the upstream values for [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml)

You can find the API Spec for the Prometheus Operator [here](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md)

### Grafana

#### Adding Dashboards
To supplement the dashboards already provided by the package you can add more dashboards that are automatically loaded into grafana:

##### Via Helm Values
1. Ensure dasboardProviders values are populated (uncommented from package values in this case):
```
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
2. Populate dashboard JSON you can name in dashbords block like so:
```
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
```
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

## Hardened Containers

### Alertmanager
The image was being pulled from quay.io/prometheus/alertmanager:v0.18.0.  There was no hardened cotainer so the image was moved to registry.dso.mil/platform-one/apps/monitoring/alertmanager:0.18.0.  This has an open issue to harden.

## Logs from the monitoring stack

#### Pre-requisites
- Monitoring stack is deployed
- ECK stack deployed

#### Getting Started

- Login to Kibana
  - username: elastic
  - Password : can be obtained by querying `kubectl get secret elasticsearch-es-elastic-user -n elastic -o yaml`
- Create Index by  selecting Management icon from the left menu and  clicking Index patterns under Kibana.  In the Create Index patterns enter <logstash-*> and click create index pattern.  In the the next step Click on the dropdown and select "@timestamp"

- For Search click on Discovery from the side menu

- In KQL textbox enter `kubernets.namespace.name : monitoring`

- Click Refresh/Update

- Note: Logs from the monitoring stack can be viewd on Kibana. The default index pattern is logstash-*. Logs for the entire monitoring stack can be procured by filtering on the "monitoring" namespace.

create an index pattern for fluentd if not already created
```
logstash-*
```
Build filter for monitoring namespace
```
{
  "query": {
    "match_phrase": {
      "kubernetes.namespace_name": "monitoring"
    }
  }
}
```
There are several pods associated with various apps in a monitoring deployment.
See each app below in order to see how each pod is split.
These pods can be pulled via the command <code>kubectl get pods -n monitoring</code>.
#### AlertManager
There are several pods for alertmanager.   
On a default installation, 3 pods will be loaded in the format <code>alertmanager-main-#</code> as shown below.
```
NAME                                  READY   STATUS    RESTARTS   AGE
alertmanager-main-0                   2/2     Running   0          156m
alertmanager-main-1                   2/2     Running   0          156m
alertmanager-main-2                   2/2     Running   0          156m
```

#### Grafana
There is 1 pod for grafana
```
NAME                                  READY   STATUS    RESTARTS   AGE
grafana-9c8f97546-vzw8p               1/1     Running   0          156m
```

#### Kube-state-metrics
There is 1 pod for kube-state-metrics
```
NAME                                  READY   STATUS    RESTARTS   AGE
kube-state-metrics-646c899496-h4lqk   3/3     Running   0          156m
```

#### Node-exporter
There is 1 pod for each node exporter.  
On a default installationm there are 4 exporters
```
NAME                                  READY   STATUS    RESTARTS   AGE
node-exporter-8tz4s                   2/2     Running   0          156m
node-exporter-f7tsw                   2/2     Running   0          156m
node-exporter-gjlln                   2/2     Running   0          156m
node-exporter-nn2ss                   2/2     Running   0          156m
```

#### Prometheus
There are 4 pods for prometheus
```
NAME                                  READY   STATUS    RESTARTS   AGE
prometheus-adapter-5cd5798d96-7zs2r   1/1     Running   0          156m
prometheus-k8s-0                      3/3     Running   1          156m
prometheus-k8s-1                      3/3     Running   1          156m
prometheus-operator-99dccdc56-fw9s9   1/1     Running   0          156m
```
Build filter for prometheus namespace
```
{
  "query": {
    "match_phrase": {
      "kubernetes.container_name": "prometheus"
    }
  }
}
```
Here are some examples of a filter for specific containers
k8s
```
{
  "query": {
    "match_phrase": {
      "kubernetes.pod_name": "prometheus-k8s"
    }
  }
}
```
operator
```
{
  "query": {
    "match_phrase": {
      "kubernetes.pod_name": "prometheus-operator"
    }
  }
}
```

In the KQL field you can text search within a source field such as log. 
```
log: "error"
```
```
log: F 
level=error 
ts=2020-07-10T20:34:13.738Z 
caller=klog.go:94 
component=k8s_client_runtime 
func=ErrorDepth 
msg="/app/discovery/kubernetes/kubernetes.go:261: Failed to list *v1.Endpoints: endpoints is forbidden: User \"system:serviceaccount:monitoring:prometheus-k8s\" cannot list resource \"endpoints\" in API group \"\" in the namespace \"default\"" stream:stderr docker.container_id:280f9823382dcfa60ea539079b9511432fdf2c1a214a84e4ee51954ddd05da61 kubernetes.container_name:prometheus kubernetes.namespace_name:monitoring kubernetes.pod_name:prometheus-k8s-1
```
Note that a log like this normally appears in one line. 

Further filters that can be used are:

#### Alertmanager

`kubernetes.labels.app` = `alertmanager` to get logs from all the alertmanager pods
  - `kubernetes.pod_name`   = `alertmanager-main-#` to get logs from a specific # pod
     - `kubernetes.container_name` = `alertmanager` or `config-reloader` to get logs from a specific container

#### Node Exporter

`kubernetes.labels.app` = `node-exporter` to get logs from all the nodeexporter pods
  - `kubernetes.pod_name`   = `pod name` to get logs from a specific  pod
     - `kubernetes.container_name` = `node-exporter` `kube-rbac-proxy` to get logs from a specific container

#### Kube State Metrics

`kubernetes.labels.app` = `kube-state-metrics` to get logs from the kube-state-metrics pod
     - `kubernetes.container_name` = `kube-state-metrics` `kube-rbac-proxy-main` or `kube-rbac-proxy-self`  to get logs from a specific container

#### Grafana

`kubernetes.labels.app` = `grafana` to get logs from the grafana pod
     - `kubernetes.container_name` = `grafana` to get logs from grafana container

#### Prometheus Adapter

`kubernetes.labels.name` = `prometheus-adapter` to get logs from the Prometheus Adapter pod
     - `kubernetes.container_name` = `prometheus-adapter` or `prometheus-config-reloader` or `rules-configmap-reloader` to get logs from a specific container

#### Prometheus Operator

  - `kubernetes.container_name` = `prometheus-operator` to get logs from the prometheus-operator container

#### Prometheus Pods

`kubernetes.labels.app` = `prometheus` to get logs from all the nodeexporter pods
  - `kubernetes.pod_name`   = `prometheus-k8s-#` to get logs from a specific <#>  pod
     - `kubernetes.container_name` = `node-exporter` to get logs from prometheus container

### To build and push

build command

```
$ docker build . -t registry.dso.mil/platform-one/apps/monitoring/grafana:6.7.0
```
push command

```
$ docker push registry.dso.mil/platform-one/apps/monitoring/grafana:6.7.0
```
