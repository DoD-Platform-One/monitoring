# Prometheus Operator Stack Components

The Prometheus Operator is a key component in the integration of the Prometheus monitoring system with the Kubernetes environment. It allows users to seamlessly run Prometheus on top of Kubernetes while preserving configurability. 

## Prometheus Operator Stack Components include the following optional areas:

### Prometheus Server 

Prometheus Server is the core architecture component which performs monitoring. It scrapes and stores metrics. It consists of the following: 

- the Retrieval - pulls metric data
- Time Series Database - stores metric data
- HTTP server - receives "promQL" queries

### Custom Resource Definitions

Custom Resource Definitions or CRDs are used to generate configuration files and identify Prometheus resources.

- alertmanagers - defines the installation for Alertmanager
- podmonitors - determines which pods to monitor
- prometheususes - defines the installation for Prometheus
- prometherules - defines the rules for Alertmanager
- servicemonitors - determines the services to be monitored

### Prometheus Metric Exporters
   - Prometheus (Exports Prometheus
Metrics)
   - node-exporter daemonset
   - sidecar containers can enable
export of Prometheus Metrics

### Prometheus Adapter

Prometheus Adapter enables Prometheus Metrics to be available for use by pod autoscaling operations.

### Visualizations & Dashboards

Prometheus web UI

Prometheus web UI is graphical User Interface that enables users to view graphs, Prometheus configurations and rules, and endpoints.


### Alert Manager

AlertManager manages alerts received from the Prometheus server then routes them through the appropriate channel.



### Additional links

The below links provide more resources to get to know the Prometheus Operator stack components:

 - Prometheus - [FIRST STEPS WITH PROMETHEUS](https://prometheus.io/docs/introduction/first_steps/)
 - Alert Manager - [CONFIGURATION](https://prometheus.io/docs/alerting/latest/configuration/)
