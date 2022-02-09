# Prometheus Operator Overview

The Prometheus Operator provides Kubernetes native deployment and management of Prometheus and related monitoring components. The purpose is to simplify and automate the configuration of a Prometheus based monitoring stack for Kubernetes clusters.

## Prometheus Operator Features

### Kubernetes Custom Resources

Use Kubernetes custom resources to deploy and manage Prometheus, Alertmanager, and related components.

### Simplified Deployment Configuration

Configure the fundamentals of Prometheus like versions, persistence, retention policies, and replicas from a native Kubernetes resource.

### Prometheus Target Configuration

Automatically generate monitoring target configurations based on familiar Kubernetes label queries; no need to learn a Prometheus specific configuration language.

## Prometheus Operator Stack Components

### Prometheus Server 

Prometheus Server is the core component which performs monitoring. It scrapes and stores metrics. It consists of the following: 

- the Retrieval - pulls metric data
- Time Series Database - stores metric data
- HTTP server - receives "promQL" queries

### Custom Resource Definitions

The Prometheus custom resource definition (CRD) declaratively defines a desired Prometheus setup to run in a Kubernetes cluster. It provides options to configure replication, persistent storage, and Alertmanagers to which the deployed Prometheus instances send alerts to.

[Refer to operator design document for interaction between the custom resource definitions](https://prometheus-operator.dev/docs/operator/design/)

**Alertmanager**

The Alertmanager custom resource definition (CRD) declaratively defines a desired Alertmanager setup to run in a Kubernetes cluster. It provides options to configure replication and persistent storage. For each Alertmanager resource, the Operator deploys a properly configured StatefulSet in the same namespace. The Alertmanager pods are configured to include a Secret called <alertmanager-name> which holds the used configuration file in the key alertmanager.yaml.

**ThanosRuler** 

The ThanosRuler custom resource definition (CRD) declaratively defines a desired Thanos Ruler setup to run in a Kubernetes cluster. With Thanos Ruler recording and alerting rules can be processed across multiple Prometheus instances.

Further information can also be found in the Thanos doc.

**ServiceMonitor**

The ServiceMonitor custom resource definition (CRD) allows to declaratively define how a dynamic set of services should be monitored. Which services are selected to be monitored with the desired configuration is defined using label selections.  

For Prometheus to monitor any application within Kubernetes an Endpoints object needs to exist. Endpoints objects are essentially lists of IP addresses. Typically an Endpoints object is populated by a Service object. A Service object discovers Pods by a label selector and adds those to the Endpoints object.

**Probe**

The Probe custom resource definition (CRD) allows to declarative define how groups of ingresses and static targets should be monitored.

**PrometheusRule**

The PrometheusRule custom resource definition (CRD) declaratively defines a desired Prometheus rule to be consumed by one or more Prometheus instances. Alerts and recording rules can be saved and applied as YAML files, and dynamically loaded without requiring any restart.

Custom Resource Definitions or CRDs are used to generate configuration files and identify Prometheus resources.

### Prometheus Metric Exporters
[todo: explain how the following mechanisms work]
   - Prometheus (Exports Prometheus Metrics)
   - node-exporter daemonset
   - sidecar containers can enable export of Prometheus Metrics

### Prometheus Adapter
[todo: explain how the following mechanisms work]
Prometheus Adapter enables Prometheus Metrics to be available for use by pod autoscaling operations.

### Visualizations & Dashboards

Prometheus web UI

Prometheus web UI is graphical User Interface that enables users to view graphs, Prometheus configurations and rules, and endpoints.

[TODO: web ui access point]

### Alert Manager

AlertManager manages alerts received from the Prometheus server then routes them through the appropriate channel.

[TODO: channel configuration setup]

## Exposing Prometheus and Grafana to users

This guide explains, how Kubernetes Ingress can be setup, in order to expose the Prometheus, Alertmanager and Grafana UIs, that are included in the kube-prometheus project.

[UI Setup](https://prometheus-operator.dev/docs/exposing-prometheus-alertmanager-grafana-ingress/)

kube-prometheus ships with a set of default Prometheus rules and Grafana dashboards. At some point one might like to extend them, the purpose of this document is to explain how to do this. 

[Prometheus Rules and Grafana Dashboards](https://prometheus-operator.dev/docs/developing-prometheus-rules-and-grafana-dashboards/)

## Prometheus with Thanos 

Thanos is a set of components that can be composed into a highly available, multi Prometheus metric system with potentially unlimited storage capacity.

Before continuing with Prometheus Operator Thanos integration, it is recommended to read more about Thanos in the [documentation](https://thanos.io/tip/thanos/getting-started.md/).

The **Prometheus Operator** operates Prometheus and optionally ThanosRuler components. Other Thanos components, such as the querier and store gateway, must be configured separately. The Thanos system integrates with Prometheus by adding a Thanos sidecar to each Prometheus instance. The Thanos sidecar can be configured directly in the Prometheus CRD. This Sidecar can hook into the Thanos querying system as well as optionally back up your data in object storage.

### Thanos architecture

[TODO]

## Additional links

The below links provide more resources to get to know the Prometheus Operator design and stack components:

 - [Operator Design](https://prometheus-operator.dev/docs/operator/design/) 
 - [Prometheus Quickstart](https://prometheus-operator.dev/docs/prologue/quick-start/)
 - [First Steps with Prometheus](https://prometheus.io/docs/introduction/first_steps/)
 - [Alert Manager Configuration](https://prometheus.io/docs/alerting/latest/configuration/)
