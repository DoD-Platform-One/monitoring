# Development and Maintenance Guide for the Monitoring package

## Code Changes for Updates

Monitoring is a modified/customized version of an upstream chart. The below details the steps required to update to a new version of the Monitoring package.

1. Navigate to the [upstream chart repo and folder](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) and find the tag that corresponds with the new chart version for this image update. For example, if updating the Prometheus image to 2.31.1 you would check the [chart values](https://github.com/prometheus-community/helm-charts/blob/kube-prometheus-stack-23.1.6/charts/kube-prometheus-stack/values.yaml#L2069) and switch Gitlab tags (naming syntax is `kube-prometheus-stack-*`) until you find the latest chart version that uses the 2.31.1 Prometheus image. Start with the newest chart version to make sure we get the latest patches.

2. Checkout the `renovate/ironbank` branch. This branch will already have most of the updates you need for the images.

3. From the root of the repo run `kpt pkg update chart@kube-prometheus-stack-23.1.6 --strategy alpha-git-patch` replacing `kube-prometheus-stack-23.1.6` with the version tag you got in step 1. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

4. See the [Big Bang Modifications](#big-bang-modifications) section below for the specific changes that need to be made to the [`chart/Chart.yaml`](#chartchartyaml) and [`chart/values.yaml`](#chartvaluesyaml) files.

5. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream.

6. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Monitoring chart to x.x.x` and `Updated image versions to latest in IB (P: x.x.x G: x.x.x A: x.x.x)` with the versions for Prometheus, Grafana, Alertmanager).

7. Update dependencies and binaries using `helm dependency update ./chart`
    - Pull assets and commit the binaries as well as the Chart.lock file that was generated.
    - **If the `prometheus/snmp_exporter` image is being updated in `Chart.yaml`:**
      - Check the [upstream prometheus-snmp-exporter
Chart.yaml](https://github.com/prometheus-community/helm-charts/blob/main/charts/prometheus-snmp-exporter/Chart.yaml) file to see if there is a new chart released with the new image update

        - If a new chart exists with the new image, from the root of the repo run the following command:
            1. Run a KPT package update

                ```shell
                kpt pkg update chart/deps/prometheus-snmp-exporter@prometheus-snmp-exporter-<version> --strategy alpha-git-patch
                ```

            2. Update the `file://./deps/prometheus-snmp-exporter` chart version in `chart/Chart.yaml` and the image version in `chart/values.yaml`.

            3. Consult the [Big Bang Modifications](#big-bang-modifications) section for the specific changes that need to be made to the [`chart/deps/prometheus-snmp-exporter/values.yaml`](#chartdepsprometheus-snmp-exportervaluesyaml) and [`chart/deps/prometheus-snmp-exporter/templates/deployment.yaml`](#chartdepsprometheus-snmp-exportertemplatesdeploymentyaml) files.

            4. Last, update dependencies and binaries using `helm dependency update ./chart`.

            **Note:** Any time any file in the `chart/deps/prometheus-snmp-exporter` directory (or a sub-directory thereof) is changed, you must run `helm dependency update ./chart` to rebuild `chart/charts/prometheus-snmp-exporter-<version>.tgz`. Failure to do so will result in your changes not being included in deployments.

        - Otherwise (if a new chart does not exist with the new image), skip this image update (i.e. revert it from `Chart.yaml` because Renovate is trying to jump ahead) and continue to `Step 9.`

8. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

9.  Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

10.  As part of your MR that modifies bigbang packages, you should modify the bigbang  [bigbang/tests/test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads) against your branch for the CI/CD MR testing by enabling your packages.

- To do this, at a minimum, you will need to follow the instructions at [bigbang/docs/developer/test-package-against-bb.md](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) with changes for Monitoring enabled (the below is a reference, actual changes could be more depending on what changes where made to Monitoring in the pakcage MR).

### [test-values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml?ref_type=heads)
```yaml
monitoring:
  enabled: true
  git:
    tag: null
    branch: "renovate/ironbank"
  values:
    istio:
      hardened:
        enabled: true
  ### Additional components of Monitoring should be changed to reflect testing changes introduced in the package MR
```

11. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

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
  values:
    istio:
      enabled: true
grafana:
  sso:
    enabled: true
    grafana:
      client_id: platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-grafana
      scopes: "openid Grafana"
  values:
    istio:
      enabled: true
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
- Login with SSO to Grafana and take a look at some dashboards, validate that data is loaded.
  - In Grafana got to the Datasources, click on Prometheus, scroll to the bottom and click on "Save and Test" to test the datasource connection to ensure no error.
- Login to Kiali and go to applications, pick monitoring namespace and prometheus for the application, validate that there is data in some of the inbound/outbound metrics fields - also validate Kiali is showing no red bells on the top bar (this could indicate connection issues with Prometheus/Grafana)

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

## Upstream changes needed for Big Bang

Due to how Big Bang is making use of Monitoring, there were values and chart changes that needed to be made.

This provides a log of these changes to make updates from upstream faster.

## Big Bang Modifications

### ```chart/Chart.yaml```

- Ensure `condition: prometheus.enabled` is set for prometheus as in the following example:

  ```yaml
  - name: prometheus
    image: registry1.dso.mil/ironbank/opensource/prometheus/prometheus:vX.Y.Z
    condition: prometheus.enabled
  ```

### ```chart/values.yaml```

- Ensure `nameOverride` is set to `chart/values.yaml` to keep resource names from changing

  ```yaml
  nameOverride: "kube-prometheus-stack"
  ```

- Ensure `alertmanager.serviceAccount.automountServiceAccountToken: false` is set.

- Ensure `alertmanager.alertmanagerSpec.externalUrl` is set.

  ```yaml
  ## The external URL the Alertmanager instances will be available under. This is necessary to generate correct URLs. This is necessary if Alertmanager is not served from root of a DNS name. string  false
  ##
  externalUrl: "https://alertmanager.{{ .Values.domain }}"
  ```

- Ensure `grafana.persistence.enabled=false` and initChownData is using a registry1 ubiX-minimal image:

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

- Ensure `prometheus-node-exporter.hostPID` is set to `false` to resolve OPA violations with the prometheus node exporter daemonset:

  ```yaml
  prometheus-node-exporter:
    ...
    hostPID: false
  ```

- Ensure the `snmpExporter` configuration is present and that the `snmpExporter.image.tag` and `snmpExporter.configmapReload.image.tag` are set to the intended versions. Consult the upstream `prometheus-snmp-exporter` chart version for the correct versions. The following is an example of the configuration block for the SNMP exporter:

  ```yaml
  ## Deploy SNMP exporter as a deployment to all nodes
  ##
  snmpExporter:
    enabled: false

  ## Configuration for prometheus-snmp-exporter sub-chart
  ##
    image:
      repository: registry1.dso.mil/ironbank/opensource/prometheus/snmp_exporter
      tag: v0.26.0

    imagePullSecrets:
      - name: private-registry

    configmapReload:
      image:
        repository: registry1.dso.mil/ironbank/opensource/prometheus-operator/prometheus-config-reloader
        tag: v0.74.0

    ## Security context to be added to snmp-exporter pods
    securityContext:
      runAsNonRoot: true
      runAsUser: 1001
      runAsGroup: 1001
      fsGroup: 1001

    ## Security context to be added to snmp-exporter containers
    containerSecurityContext:
      runAsGroup: 1001
      runAsNonRoot: true
      runAsUser: 1001
      capabilities:
        drop:
          - ALL

    # Enable this if you're using https://github.com/prometheus-operator/prometheus-operator
    # A service monitor will be created per each item in serviceMonitor.params[]
    serviceMonitor:
      enabled: true
  ```

- Ensure the `blackboxExporter` and `prometheus-blackbox-exporter` configuration is present and that the `prometheus-blackbox-exporter.image.tag` and `prometheus-blackbox-exporter.configmapReload.image.tag` are set to the intended versions. Consult the upstream `prometheus-blackbox-exporter` chart version for the correct versions. The following is an example of the configuration block for the SNMP exporter:

```yaml
# Enable blackbox exporter 
blackboxExporter:
  enabled: false

## Configuration for Prometheus Blackbox exporter subchart
prometheus-blackbox-exporter:
  global:
    ## Global image registry to use if it needs to be overriden for some specific use cases (e.g local registries, custom images, ...)
    ##
    imageRegistry: "registry1.dso.mil"

  restartPolicy: Always

  kind: Deployment

  ## Override the namespace
  ##
  namespaceOverride: ""

  # Override Kubernetes version if your distribution does not follow semver v2
  kubeVersionOverride: ""

  ## set to true to add the release label so scraping of the servicemonitor with kube-prometheus-stack works out of the box
  releaseLabel: false

  podDisruptionBudget: {}
    # maxUnavailable: 0

  ## Allow automount the serviceaccount token for sidecar container (eg: oauthproxy)
  automountServiceAccountToken: false

  ## Additional blackbox-exporter container environment variables
  ## For instance to add a http_proxy
  ##
  ## extraEnv:
  ##   HTTP_PROXY: "http://superproxy.com:3128"
  ##   NO_PROXY: "localhost,127.0.0.1"
  extraEnv: {}

  ## Additional blackbox-exporter container environment variables for secret
  ## extraEnvFromSecret:
  ##   - secretOne
  ##   - secretTwo
  extraEnvFromSecret: ""

  extraVolumes: []
    # - name: secret-blackbox-oauth-htpasswd
    #   secret:
    #     defaultMode: 420
    #     secretName: blackbox-oauth-htpasswd
    # - name: storage-volume
    #   persistentVolumeClaim:
    #     claimName: example

  ## Additional volumes that will be attached to the blackbox-exporter container
  extraVolumeMounts:
    # - name: ca-certs
    #   mountPath: /etc/ssl/certs/ca-certificates.crt

  ## Additional InitContainers to initialize the pod
  ## This supports either a structured array or a templatable string
  extraInitContainers: []

  ## This supports either a structured array or a templatable string

  # Array mode
  extraContainers: []
    # - name: oAuth2-proxy
    #   args:
    #     - -https-address=:9116
    #     - -upstream=http://localhost:9115
    #     - -skip-auth-regex=^/metrics
    #     - -openshift-delegate-urls={"/":{"group":"monitoring.coreos.com","resource":"prometheuses","verb":"get"}}
    #   image: openshift/oauth-proxy:v1.1.0
    #   ports:
    #       - containerPort: 9116
    #         name: proxy
    #   resources:
    #       limits:
    #         memory: 16Mi
    #       requests:
    #         memory: 4Mi
    #         cpu: 20m
    #   volumeMounts:
    #     - mountPath: /etc/prometheus/secrets/blackbox-tls
    #       name: secret-blackbox-tls

  ## Number of replicasets to retain ##
  ## default value is 10, 0 will not retain any replicasets and make rollbacks impossible ##
  revisionHistoryLimit: 10

  # String mode
  # extraContainers: |-
  #   - name: oAuth2-proxy
  #     args:
  #       - -https-address=:9116
  #       - -upstream=http://localhost:9115
  #       - -skip-auth-regex=^/metrics
  #       - -openshift-delegate-urls={"/":{"group":"monitoring.coreos.com","resource":"prometheuses","verb":"get"}}
  #     image: {{ .Values.global.imageRegistry }}/openshift/oauth-proxy:v1.1.0

  hostNetwork: false

  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate

  image:
    registry: registry1.dso.mil
    repository: ironbank/opensource/prometheus/blackbox_exporter
    # Overrides the image tag whose default is {{ printf "v%s" .Chart.AppVersion }}
    tag: v0.26.0

    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName

  podSecurityContext: {}
  # fsGroup: 1000

  ## User and Group to run blackbox-exporter container as
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    readOnlyRootFilesystem: true
    runAsNonRoot: true
    allowPrivilegeEscalation: false
    capabilities:
      drop: ["ALL"]
  # Add NET_RAW to enable ICMP
  #    add: ["NET_RAW"]

  livenessProbe:
    httpGet:
      path: /-/healthy
      port: http
    failureThreshold: 3

  readinessProbe:
    httpGet:
      path: /-/healthy
      port: http

  nodeSelector: {}
  tolerations: []
  affinity: {}

  ## Topology spread constraints rely on node labels to identify the topology domain(s) that each Node is in.
  ## Ref: https://kubernetes.io/docs/concepts/workloads/pods/pod-topology-spread-constraints/
  topologySpreadConstraints: []
    # - maxSkew: 1
    #   topologyKey: failure-domain.beta.kubernetes.io/zone
    #   whenUnsatisfiable: DoNotSchedule
    #   labelSelector:
    #     matchLabels:
  #       app.kubernetes.io/instance: jiralert

  # if the configuration is managed as secret outside the chart, using SealedSecret for example,
  # provide the name of the secret here. If secretConfig is set to true, configExistingSecretName will be ignored
  # in favor of the config value.
  configExistingSecretName: ""
  # Store the configuration as a `Secret` instead of a `ConfigMap`, useful in case it contains sensitive data
  secretConfig: false
  config:
    modules:
      http_2xx:
        prober: http
        timeout: 5s
        http:
          valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
          follow_redirects: true
          preferred_ip_protocol: "ip4"

  # Set custom config path, other than default /config/blackbox.yaml. If let empty, path will be "/config/blackbox.yaml"
  # configPath: "/foo/bar"

  extraConfigmapMounts: []
    # - name: certs-configmap
    #   mountPath: /etc/secrets/ssl/
    #   subPath: certificates.crt # (optional)
    #   configMap: certs-configmap
    #   readOnly: true
    #   defaultMode: 420

  ## Additional secret mounts
  # Defines additional mounts with secrets. Secrets must be manually created in the namespace.
  extraSecretMounts: []
    # - name: secret-files
    #   mountPath: /etc/secrets
    #   secretName: blackbox-secret-files
    #   readOnly: true
    #   defaultMode: 420

  resources: {}
    # limits:
    #   memory: 300Mi
    # requests:
    #   memory: 50Mi

  priorityClassName: ""

  service:
    annotations: {}
    labels: {}
    type: ClusterIP
    port: 9115
    ipDualStack:
      enabled: false
      ipFamilies: ["IPv6", "IPv4"]
      ipFamilyPolicy: "PreferDualStack"

  # Only changes container port. Application port can be changed with extraArgs (--web.listen-address=:9115)
  # https://github.com/prometheus/blackbox_exporter/blob/998037b5b40c1de5fee348ffdea8820509d85171/main.go#L55
  containerPort: 9115

  # Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If zero, no port is exposed.
  # This is useful for communicating with Daemon Pods when kind is DaemonSet.
  hostPort: 0

  serviceAccount:
    # Specifies whether a ServiceAccount should be created
    create: true
    # The name of the ServiceAccount to use.
    # If not set and create is true, a name is generated using the fullname template
    name:
    annotations: {}

  ## An Ingress resource can provide name-based virtual hosting and TLS
  ## termination among other things for CouchDB deployments which are accessed
  ## from outside the Kubernetes cluster.
  ## ref: https://kubernetes.io/docs/concepts/services-networking/ingress/
  ingress:
    enabled: false
    className: ""
    labels: {}
    annotations: {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    hosts:
      ## The host property on hosts and tls is passed through helm tpl function.
      ## ref: https://helm.sh/docs/developing_charts/#using-the-tpl-function
      - host: chart-example.local
        paths:
          - path: /
            pathType: ImplementationSpecific
    tls: []
    #  - secretName: chart-example-tls
    #    hosts:
    #      - chart-example.local

  podAnnotations: {}

  # Annotations for the Deployment
  deploymentAnnotations: {}

  # Annotations for the Secret
  secretAnnotations: {}

  # Hostaliases allow to add additional DNS entries to be injected directly into pods.
  # This will take precedence over your implemented DNS solution
  hostAliases: []
  #  - ip: 192.168.1.1
  #    hostNames:
  #      - test.example.com
  #      - another.example.net

  pod:
    labels: {}

  extraArgs: []
    # - --history.limit=1000

  replicas: 1

  serviceMonitor:
    ## If true, a ServiceMonitor CRD is created for a prometheus operator
    ## https://github.com/coreos/prometheus-operator for blackbox-exporter itself
    ##
    selfMonitor:
      enabled: false
      additionalMetricsRelabels: {}
      additionalRelabeling: []
      labels: {}
      path: /metrics
      scheme: http
      tlsConfig: {}
      interval: 30s
      scrapeTimeout: 30s
      ## Port can be defined by assigning a value for the port key below
      ## port:

    ## If true, a ServiceMonitor CRD is created for a prometheus operator
    ## https://github.com/coreos/prometheus-operator for each target
    ##
    enabled: false

    # Default values that will be used for all ServiceMonitors created by `targets`
    defaults:
      additionalMetricsRelabels: {}
      additionalRelabeling: []
      labels: {}
      interval: 30s
      scrapeTimeout: 30s
      honorTimestamps: true
      module: http_2xx
    ## scheme: HTTP scheme to use for scraping. Can be used with `tlsConfig` for example if using istio mTLS.
    scheme: http
    ## path: HTTP path. Needs to be adjusted, if web.route-prefix is set
    path: "/probe"
    ## tlsConfig: TLS configuration to use when scraping the endpoint. For example if using istio mTLS.
    ## Of type: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#tlsconfig
    tlsConfig: {}
    bearerTokenFile:

    targets:
  #    - name: example                    # Human readable URL that will appear in Prometheus / AlertManager
  #      url: http://example.com/healthz  # The URL that blackbox will scrape
  #      hostname: example.com            # HTTP probes can accept an additional `hostname` parameter that will set `Host` header and TLS SNI
  #      labels: {}                       # Map of labels for ServiceMonitor. Overrides value set in `defaults`
  #      interval: 60s                    # Scraping interval. Overrides value set in `defaults`
  #      scrapeTimeout: 60s               # Scrape timeout. Overrides value set in `defaults`
  #      module: http_2xx                 # Module used for scraping. Overrides value set in `defaults`
  #      additionalMetricsRelabels: {}    # Map of metric labels and values to add
  #      additionalRelabeling: []         # List of metric relabeling actions to run

  ## Custom PrometheusRules to be defined
  ## ref: https://github.com/coreos/prometheus-operator#customresourcedefinitions
  prometheusRule:
    enabled: false
    additionalLabels: {}
    namespace: ""
    rules: []

  podMonitoring:
    ## If true, a PodMonitoring CR is created for google managed prometheus
    ## https://cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed#gmp-pod-monitoring for blackbox-exporter itself
    ##
    selfMonitor:
      enabled: false
      additionalMetricsRelabels: {}
      labels: {}
      path: /metrics
      interval: 30s
      scrapeTimeout: 30s

    ## If true, a PodMonitoring CR is created for a google managed prometheus
    ## https://cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed#gmp-pod-monitoring for each target
    ##
    enabled: false

    ## Default values that will be used for all PodMonitoring created by `targets`
    ## Following PodMonitoring API specs https://github.com/GoogleCloudPlatform/prometheus-engine/blob/main/doc/api.md#scrapeendpoint
    defaults:
      additionalMetricsRelabels: {}
      labels: {}
      interval: 30s
      scrapeTimeout: 30s
      module: http_2xx
    ## scheme: Protocol scheme to use to scrape.
    scheme: http
    ## path: HTTP path. Needs to be adjusted, if web.route-prefix is set
    path: "/probe"
    ## tlsConfig: TLS configuration to use when scraping the endpoint. For example if using istio mTLS.
    ## Of type: https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#tlsconfig
    tlsConfig: {}

    targets:
  #    - name: example                    # Human readable URL that will appear in Google Managed Prometheus / AlertManager
  #      url: http://example.com/healthz  # The URL that blackbox will scrape
  #      hostname: example.com            # HTTP probes can accept an additional `hostname` parameter that will set `Host` header and TLS SNI
  #      labels: {}                       # Map of labels for PodMonitoring. Overrides value set in `defaults`
  #      interval: 60s                    # Scraping interval. Overrides value set in `defaults`
  #      scrapeTimeout: 60s               # Scrape timeout. Overrides value set in `defaults`
  #      module: http_2xx                 # Module used for scraping. Overrides value set in `defaults`
  #      additionalMetricsRelabels: {}    # Map of metric labels and values to add

  ## Network policy for chart
  networkPolicy:
    # Enable network policy and allow access from anywhere
    enabled: false
    # Limit access only from monitoring namespace
    # Before setting this value to true, you must add the name=monitoring label to the monitoring namespace
    # Network Policy uses label filtering
    allowMonitoringNamespace: false

  ## dnsPolicy and dnsConfig for Deployments and Daemonsets if you want non-default settings.
  ## These will be passed directly to the PodSpec of same.
  dnsPolicy:
  dnsConfig:

  # Extra manifests to deploy as an array
  extraManifests: []
    # - apiVersion: v1
    #   kind: ConfigMap
    #   metadata:
    #   labels:
    #     name: prometheus-extra
    #   data:
    #     extra-data: "value"

  # global common labels, applied to all ressources
  commonLabels: {}

  # Enable vertical pod autoscaler support for prometheus-blackbox-exporter
  verticalPodAutoscaler:
    enabled: false

    # Recommender responsible for generating recommendation for the object.
    # List should be empty (then the default recommender will generate the recommendation)
    # or contain exactly one recommender.
    # recommenders:
    # - name: custom-recommender-performance

    # List of resources that the vertical pod autoscaler can control. Defaults to cpu and memory
    controlledResources: []
    # Specifies which resource values should be controlled: RequestsOnly or RequestsAndLimits.
    # controlledValues: RequestsAndLimits

    # Define the max allowed resources for the pod
    maxAllowed: {}
    # cpu: 200m
    # memory: 100Mi
    # Define the min allowed resources for the pod
    minAllowed: {}
    # cpu: 200m
    # memory: 100Mi

    updatePolicy:
      # Specifies minimal number of replicas which need to be alive for VPA Updater to attempt pod eviction
      # minReplicas: 1
      # Specifies whether recommended updates are applied when a Pod is started and whether recommended updates
      # are applied during the life of a Pod. Possible values are "Off", "Initial", "Recreate", and "Auto".
      updateMode: Auto

  configReloader:
    enabled: false
    containerPort: 8080
    config:
      logFormat: logfmt
      logLevel: info
      watchInterval: 1m
    image:
      registry: registry1.dso.mil
      repository: ironbank/opensource/prometheus-operator/prometheus-config-reloader
      tag: v0.82.0
      pullPolicy: IfNotPresent
      digest: ""
    securityContext:
      runAsUser: 1000
      runAsGroup: 1000
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      allowPrivilegeEscalation: false
      capabilities:
        drop: ["ALL"]
    resources:
      limits:
        memory: 50Mi
      requests:
        cpu: 10m
        memory: 20Mi
    livenessProbe:
      httpGet:
        path: /healthz
        port: reloader-web
        scheme: HTTP
    readinessProbe:
      httpGet:
        path: /healthz
        port: reloader-web
        scheme: HTTP
    service:
      port: 8080
    serviceMonitor:
      selfMonitor:
        additionalMetricsRelabels: {}
        additionalRelabeling: []
        path: /metrics
        scheme: http
        tlsConfig: {}
        interval: 30s
        scrapeTimeout: 30s
```

- Ensure `prometheusOperator.clusterDomain: "cluster.local"` is set.

- Ensure `prometheusOperator.resources` is set to the following:

  ```yaml
  resources:
    limits:
      cpu: 200m
      memory: 512Mi
    requests:
      cpu: 200m
      memory: 512Mi
  ```

- Ensure the `prometheusOperator.image.tag` and `prometheusOperator.prometheusConfigReloader.image.tag` values are not ahead of the actual `appVersion` in `Chart.yaml`. You need to check `values.yaml` and `Chart.yaml` for unintended changes. The bot will try to jump ahead.

- Ensure `prometheus.prometheusSpec.externalUrl` is set.

  ```yaml
  ## External URL at which Prometheus will be reachable.
  ##
  externalUrl: "https://prometheus.{{ .Values.domain }}"
  ```

- Ensure the `prometheus-blackbox-exporter` configuration is present and the images are set to pull from ironbank.

### ```chart/deps/prometheus-snmp-exporter/values.yaml```

- Ensure `nameOverride` is set to `prometheus-snmp-exporter` to keep resource names from changing due to the use of the `snmpExporter` alias.

  ```yaml
  nameOverride: "prometheus-snmp-exporter"
  ```

### ```chart/deps/prometheus-snmp-exporter/templates/deployment.yaml```

- To comply with Kyverno policies, we alter the upstream chart to pass `containerSecurityContext` into the `configmap-reload` container. This is done by adding the following block to the `configmap-reload` container:

  ```yaml
  {{- if .Values.containerSecurityContext }}
            securityContext:
  {{ toYaml .Values.containerSecurityContext | indent 12 }}
          {{- end }}
  ```
