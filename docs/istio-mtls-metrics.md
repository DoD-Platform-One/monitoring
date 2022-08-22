# Metrics with Istio mTLS

Prometheus is capable of scraping metrics across either HTTP or HTTPS. When mTLS STRICT is configured for your application you need to modify all monitors to scrape across HTTPS with the proper config for the Istio sidecar certs.

If you are unable to configure the monitors/Prometheus in the way described below you will have to add a port mTLS "exception" to set the mTLS mode to PERMISSIVE for your metrics port. In many cases this is not ideal since metrics may be exposed on the same port as other things.

The Big Bang approach to mTLS metrics was primarily based off of the upstream Istio guidance provided in [this document](https://istio.io/latest/docs/ops/integrations/prometheus/#configuration).

## Prometheus Config

Note that this is only included by way of explanation/assistance if deploying monitoring on its own. When you deploy monitoring via Big Bang this configuration is already done for you.

To ensure that Prometheus properly mounts Istio's certs add the following values to your deployment of Monitoring:

```yaml
prometheus:
  prometheusSpec:
    volumes:
      - emptyDir:
          medium: Memory
        name: istio-certs
    volumeMounts:
      - mountPath: /etc/prom-certs/
        name: istio-certs
    podMetadata:
      annotations:
        traffic.sidecar.istio.io/includeOutboundIPRanges: ""
        proxy.istio.io/config: |
          proxyMetadata:
            OUTPUT_CERTS: /etc/istio-output-certs
        sidecar.istio.io/userVolumeMount: '[{"name": "istio-certs", "mountPath": "/etc/istio-output-certs"}]'
```

If deploying via Big Bang you should indent these under `monitoring.values`.

## ServiceMonitor Config

To configure your service monitor to expose metrics on HTTPS you will need to add the following to each endpoint:

```yaml
...
spec:
  endpoints:
    - ... # Your endpoint config here
      scheme: https
      tlsConfig:
        caFile: /etc/prom-certs/root-cert.pem
        certFile: /etc/prom-certs/cert-chain.pem
        keyFile: /etc/prom-certs/key.pem
        insecureSkipVerify: true  # Prometheus does not support Istio security naming, thus skip verifying target pod certificate
...
```

With this in place for each service monitor you should be able to enable STRICT mTLS for your application.

## PodMonitor Config

It is not currently feasible to setup an application pod monitor with Istio mTLS scraping. There are still several options to ensure that your metrics are being scraped, although mTLS may not be possible depending on your application:

1. Switch to a service monitor, then follow the guidance above to ensure that the monitor is configured for TLS with Istio: this should generally be an option even if you need to create an additional service strictly for your metrics. Where possible this is the best way forward so that metrics are exposed only via TLS.

2. Metrics merging: Istio has the ability to merge your application metrics in with the sidecar metrics exposed on port 15020. These sidecar metrics are already scraped by default in the monitoring chart/Big Bang. Note that the metrics are still exposed via plaintext, but a STRICT mTLS configuration will permit this without any exceptions since 15020 is a special Istio port. To configure this you will need to add several annotations to your pods.

    ```yaml
    prometheus.io/path: "/metrics" # Path that metrics are exposed on
    prometheus.io/port: "9876" # Port that metrics are exposed on
    prometheus.istio.io/merge-metrics: "true" # Should be set by default for the entire mesh, but this instructs Istio to merge the metrics
    ```

    With this in place you should be able to delete your PodMonitor and still see your metrics appearing in Prometheus. Due to the way the metrics are merged and then scraped, the source of the metrics will show as the Istio job/container. If this causes issues with your usage of the metrics you will not be able to make use of this method. You should also not use this method if any of your applications expose metrics that overlap with the default sidecar metrics, as the sidecar will take precedence.

3. Create an mTLS "exception" for your metrics port: This is generally only recommended if your metrics are the only thing exposed on the port since you will effectively be allowing PERMISSIVE mTLS for the entire port. An example of an mTLS "exception" is provided below:

    ```yaml
    apiVersion: "security.istio.io/v1beta1"
    kind: PeerAuthentication
    metadata:
      name: my-app-metrics-exception
      namespace: my-app-ns
    spec:
      mtls:
        # Configure a default STRICT for the pod to ensure all other ports are enforcing STRICT
        mode: STRICT
      selector:
        matchLabels:
          app: my-app
      portLevelMtls:
        # Your metrics port here
        "9876":
          # Enable PERMISSIVE mTLS only for the metrics port
          mode: PERMISSIVE
    ```
