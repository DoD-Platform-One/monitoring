# Prometheus Security

## Prometheus Security Model

Prometheus is an open source software that makes the following assumptions:

- Untrusted users have access to the Prometheus HTTP endpoint and logs.
- Only trusted users have the ability to change the command line, configuration file, rule files, and other aspects of the runtime environment of Prometheus and other components.
- The target that Prometheus scrapes, how often and with what other settings is determined entirely via the configuration file.
- The administrator may decide to use information from service discovery systems, which combined with relabelling may grant some of this control to anyone who can modify data in that service discovery system.
- Scraped targets may be run by untrusted users.
- It should not by default be possible for a target to expose data that impersonates a different target.
- Prometheus 2.0 (web.enable-admin-api) flag controls access to the administrative HTTP API which is disabled by default.
- The remote read feature allows anyone with HTTP access to send queries to the remote read endpoint.

## Single Sign On - KeyCloak

Keycloak is an Open Source Identity and Access Management solution which makes it easy to secure applications and services with little to no code. Keycloak is highly customizable and utilizes Service Provider Interfaces.

Prometheus requires an exporter if the application does not export the metrics. Keycloak Metrics SPI resolves this issue and adds metric endpoints to Keycloak. This enables vital data to be collected about the actions within Keycloak.
By default, the endpoint returns metrics data to be scraped by Prometheus.

Refer to this [link](https://prometheus.io/docs/operating/security/) for additional security information.

### Additional links

- [Monitoring Specific Keycloak Configuration](https://repo1.dso.mil/platform-one/big-bang/apps/core/monitoring/-/blob/main/docs/KEYCLOAK.md)
- [KeyCloak](https://www.keycloak.org/extensions.html)
- [Keycloak Metrics SPI](https://github.com/aerogear/keycloak-metrics-spi/blob/master/README.md)
