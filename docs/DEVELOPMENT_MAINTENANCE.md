# Code Changes for Updates

Monitoring is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Monitoring package.

1. Navigate to the [upstream chart repo and folder](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) and find the tag that corresponds with the new chart version for this image update. For example, if updating the Prometheus image to 2.31.1 you would check the [chart values](https://github.com/prometheus-community/helm-charts/blob/kube-prometheus-stack-23.1.6/charts/kube-prometheus-stack/values.yaml#L2069) and switch Gitlab tags (naming syntax is `kube-prometheus-stack-*`) until you find the latest chart version that uses the 2.31.1 Prometheus image. Start with the newest chart version to make sure we get the latest patches.

2. Validate that the other images required by this chart version are ready and available in Ironbank. Look at the previous releases `images.txt` to get the list of images and search through the values file to find what the new versions are.

3. Checkout the `renovate/ironbank` branch. This branch will already have most of the updates you need for the images.

4. From the root of the repo run `kpt pkg update chart@kube-prometheus-stack-23.1.6 --strategy alpha-git-patch` replacing `kube-prometheus-stack-23.1.6` with the version tag you got in step 1. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

```chart/Chart.yaml```
- Ensure that `condition: prometheus.enabled` is set for prometheus as in the following example:

```yaml
    - name: prometheus
      image: registry1.dso.mil/ironbank/opensource/prometheus/prometheus:vX.Y.Z
      condition: prometheus.enabled
```

```chart/values.yaml```
- We want to ensure that `grafana.persistence.enabled=false` and initChownData is using a registry1 ubiX-minimal image:
```yaml
grafana:
  ...
  persistence:
    type: pvc
    enabled: false
    # storageClassName: default
    accessModes:
      - ReadWriteOnce
    size: 10Gi
    # annotations: {}

  initChownData:
    ## If false, data ownership will not be reset at startup
    ## This allows the prometheus-server to be run with an arbitrary user
    ##
    enabled: false
  
    ## initChownData container image
    ##
    image:
      repository: registry1.dso.mil/ironbank/redhat/ubi/9-minimal
      tag: "9.4"
      sha: ""
      pullPolicy: IfNotPresent
  
    ## initChownData resource requests and limits
    ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
    ##
    resources:
      limits:
        cpu: 100m
        memory: 128Mi
      requests:
        cpu: 100m
        memory: 128Mi
```

5. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream.

6. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Monitoring chart to x.x.x` and `Updated image versions to latest in IB (P: x.x.x G: x.x.x A: x.x.x)` with the versions for Prometheus, Grafana, Alertmanager).

7. Run `helm dependency update chart` from the root of the project. This ensures that the latest subchart versions are pulled in and packaged as `tgz` for airgap.

8. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

9. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

10. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

## Manual Testing for Updates

>NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point monitoring to your branch. For an upgrade do an install with monitoring pointing to the latest tag, then perform a helm upgrade with monitoring pointing to your branch.

The following overrides can be used for a bare minimum monitoring deployment:

```yaml
istio:
  enabled: true
istioOperator:
  enabled: true
monitoring:
  enabled: true
  git:
    tag: null
    branch: "renovate/ironbank"
  sso:
    enabled: true
    prometheus:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-prometheus
    alertmanager:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-alertmanager
grafana:
  sso:
    enabled: true
    grafana:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-grafana
      scopes: "openid Grafana"
jaeger:
  enabled: true
  sso:
    enabled: true
    client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-jaeger
kiali:
  enabled: true
  sso:
    enabled: true
    client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-kiali

addons:
  authservice:
    enabled: true
```

Testing Steps:

- Login with SSO to Prometheus (if you are not prompted for an SSO login, this could indicate a problem with the authservice connection), check the Status -> Targets page and validate that all targets show as up
- Login with SSO to Alertmanager and validate that alerts are firing (if the main page shows no alert groups check the Prometheus logs and see if there are errors with that connection)
- Login with SSO to Grafana and take a look at some dashboards, validate that data is loaded
- Login to Kiali and go to applications, pick monitoring namespace and prometheus for the application, validate that there is data in some of the inbound/outbound metrics fields - also validate Kiali is showing no red bells on the top bar (this could indicate connection issues with Prometheus/Grafana)

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

# Upstream changes needed for Big Bang

Due to how Big Bang is making use of Monitoring, there were values and chart changes that needed to be made.

This provides a log of these changes to make updates from upstream faster.

## Big Bang Modifications

### Change chart name
Change chart name to monitoring to match BB values

Add nameOverride to `chart/values.yaml` to keep resource names from changing
```yaml
nameOverride: "kube-prometheus-stack"
```

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
