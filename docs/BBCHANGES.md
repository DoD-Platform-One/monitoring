# Changes needed for Big Bang

Due to how Big Bang is making use of Monitoring, there were values and chart changes that needed to be made.

This provides a log of these changes to make updates from upstream faster.

## Big Bang Modifications

### Prometheus Node Exporter

In `chart/values.yaml`, an additional value was created to resolve OPA violations with the prometheus node exporter daemonset:

```yaml
prometheus-node-exporter:
  hostPID: false
```

The corresponding hard-coded values in the templates were then updated to dynamically utilize the value:

```yaml
# chart/deps/prometheus-node-exporter/templates/psp.yaml
# chart/deps/prometheus-node-exporter/templates/daemonset.yaml
hostPID: {{ .Values.hostPID }}
```
