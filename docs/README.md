# Monitoring - kube-prometheus version 0.4

This repository is based on [kube-prometheus](https://github.com/coreos/kube-prometheus/tree/release-0.4) version 0.4.

If you are looking to update the resources in this repo, grab the new manifests from the release branch and integrate it.

Be sure to update kustomization.yaml as needed.

## Configuration

You can find the API Spec for the Prometheus Operator [here](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md)

### Grafana
Grafana configuration can be done via the secrets/grafana-ini.enc.yaml file. It creates a k8s secret called grafana-ini-config and mounts the inline file to /etc/grafana/grafana.ini within the container.
OAuth config is done within this file, keycloak auth for example can be configured under the [auth.generic_oauth] section. It must be set to enabled = true to activate.
Variables to update are "KEYCLOAK_URL", "KEYCLOAK_REALM" within [auth.generic_oauth], "GRAFANA_URL" within [server], signout_redirect_url within [auth] as well as client_secret and client_id within [auth.generic_oauth].
root_url is a critical variable to make sure matches your full grafana URL eg https://grafana.fences.dso.mil/ .
Ensure that Mappers within specific keycloak client have builtin "profile", "username" and "email" mappers added.

### Pre-requisites

* Kubernetes cluster deployed
* kubectl configuration installed

Install kubectl

```
brew install kubectl
```

Install kustomize

```
brew install kustomize
```

By default an admin user with username "admin" and password "admin" is created for logging into the Grafana dashboard and you will beprompted to change the passoword after logging in.

## Hardened Containers

### Promethus 
Updates to Dockerfile from DCCSCR
* pull registry.access.redhat.com/ubi8/ubi:8.2 and put in your local registry
* pull docker.io/prom/prometheus@sha256:7ff47b8cce6ecb7b456c6863d42a7f10bcbd040b21d7f1a912eb1b0936e9ad46" 
  * retag as nexus-docker-secure.levelup-nexus.svc.cluster.local:18082/opensource/istio/prom/prometheus:2.15.1
  * push to nexus-docker-secure.levelup-nexus.svc.cluster.local:18082/opensource/istio/prom/prometheus:2.15.1
* change FROM ${BASE_IMAGE}:${BASE_TAG} to FROM ${BASE_REGISTRY}/${BASE_IMAGE}:${BASE_TAG}

### Grafana   
Updates to Dockerfile from DCCSCR  
 * change line 21 from COPY ${ENTRYPOINT_SCRIPT} / to COPY scripts/run.sh /
 * change COPY ${GRAFANA_PKG} /tmp/grafana-gpg.key to COPY grafana-gpg.key /tmp/grafana-gpg.key
 * Change line 26 to read RUN yum install grafana-6.7.0.rpm -v -y && RUN yum clean all && yum -y upgrade
    * package name should match ARG GRAFANA_PKG value

### Alertmanager
The image was being pulled from quay.io/prometheus/alertmanager:v0.18.0.  There was no hardened cotainer so the image was moved to registry.dso.mil/platform-one/apps/monitoring/alertmanager:0.18.0.  This has an open issue to harden.

## Logs from the monitoring stack

#### Pre-requisites
- Monitoring stack is deployed
- ECK stack deployed

#### Getting Started

- Login to Kibana
  - username: elastic
  - Password : can be obtained by querying kubectl get secret elasticsearch-es-elastic-user -n elastic -o yaml
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
