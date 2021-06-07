# Monitoring Documentation
 
# Table of Contents
- [Deployment](#deploy-monitoring)
- [Prerequisites](#pre-requisites)
- [Monitoring configuration](docs/README.md)
- [Keycloak configuration](docs/KEYCLOAK.md)


# Prerequisites
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