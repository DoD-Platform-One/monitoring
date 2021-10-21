# Monitoring Documentation

Monitoring big bang package is a stack including alertmanager, nodeexporter, kube-state-metrics, grafana, and prometheus. The package provides common tools and visualizations to capture, alert, and monitor the operations in a big bang cluster.
 
# Table of Contents
- [Deployment](#deployment)
- [Prerequisites](#prerequisites)
- [Monitoring configuration](docs/README.md)
- [Keycloak configuration](docs/KEYCLOAK.md)


## Prerequisites
* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm
https://helm.sh/docs/intro/install/

## Deployment
```
git clone https://repo1.dso.mil/platform-one/big-bang/apps/core/monitoring.git
cd monitoring
helm dependency update chart
helm install monitoring chart --debug
```
