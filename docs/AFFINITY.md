# Node Affinity & Anti-Affinity with Monitoring

Affinity is exposed through values options for Monitoring. If you want to schedule your pods to deploy on specific nodes you can do that through multiple values. Additional info is provided below as well to help in configuring this.

It is good to have a basic knowledge of node affinity and available options to you before customizing in this way - the upstream kubernetes documentation [has a good walkthrough of this](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).

## Values for NodeSelector

The `nodeSelector` value can be set at multiple levels (alertmanager, prometheusOperator, prometheus, grafana, kube-state-metrics, and the node-exporter) to do basic node selection for deployments. See the below example for an example to schedule pods to only nodes with the label `node-type` equal to `monitoring`:

```yaml
alertmanager:
  alertmanagerSpec:
    nodeSelector:
      node-type: monitoring

prometheus:
  prometheusSpec:
    nodeSelector:
      node-type: monitoring

prometheusOperator:
  nodeSelector:
    node-type: monitoring

grafana:
  nodeSelector:
    node-type: monitoring

kube-state-metrics:
  nodeSelector:
    node-type: monitoring

prometheus-node-exporter:
  nodeSelector:
    node-type: monitoring
```

## Values for Affinity

Affinity values for prometheus can be specified at all the same levels. The format to include follows what you'd specify at a pod level. See the examples below to see the correct values for scheduling pods to only nodes with the label `node-type` equal to `monitoring`:

```yaml
alertmanager:
  alertmanagerSpec:
    affinity:
      nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          nodeSelectorTerms:
          - matchExpressions:
            - key: node-type
              operator: In
              values:
              - monitoring

prometheus:
  prometheusSpec:
    affinity:
      nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          nodeSelectorTerms:
          - matchExpressions:
            - key: node-type
              operator: In
              values:
              - monitoring

prometheusOperator:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: node-type
            operator: In
            values:
            - monitoring

grafana:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: node-type
            operator: In
            values:
            - monitoring

kube-state-metrics:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: node-type
            operator: In
            values:
            - monitoring

prometheus-node-exporter:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: node-type
            operator: In
            values:
            - monitoring
```

## Values for Anti-Affinity

Anti-affinity is also configurable for all the same levels. Alertmanager and prometheus provide simple "soft"/"hard" configuration to configure those pods to not deploy on the same nodes as other alertmanager/prometheus pods. The other 4 pieces of monitoring require a manual configuration of anti-affinity (following the upstream pattern). For the "manual" anti-affinity examples are provided for keeping pods from scheduling on nodes that have pods labeled `dont-schedule-with: <name>`:

```yaml
alertmanager:
  alertmanagerSpec:
    podAntiAffinity: "hard"

prometheus:
  prometheusSpec:
    podAntiAffinity: "hard"

prometheusOperator:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - topologyKey: kubernetes.io/hostname
        labelSelector:
          matchLabels:
            dont-schedule-with: prometheusOperator

grafana:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - topologyKey: kubernetes.io/hostname
        labelSelector:
          matchLabels:
            dont-schedule-with: grafana

kube-state-metrics:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - topologyKey: kubernetes.io/hostname
        labelSelector:
          matchLabels:
            dont-schedule-with: kube-state-metrics

prometheus-node-exporter:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - topologyKey: kubernetes.io/hostname
        labelSelector:
          matchLabels:
            dont-schedule-with: prometheus-node-exporter
```
