# Monitoring Specific Keycloak Configuration

# Table of Contents
- Keycloak configuration
- Grafana configuration
- Prometheus+Alertmanager configuration

These are the items you need to configure after keycloak and Grafana are working on your cluster, or you are utilizing an external keycloak eg: login.dso.mil

## Keycloak Configuration

#### Grafana
1. Create a grafana client scope named "Grafana" with the following mappings

  | Name             | Mapper Type       | Mapper Selection Sub | Token Claim Name                   | Claim JSON Type |        Other            |
  |------------------|-------------------|----------------------|------------------------------------|-----------------|-------------------------|
  | profile          | User Attribute    | profile              | profile                            | String          | Add to ID token: on     |
  |                  |                   |                      |                                    |                 | Add to access token: on | 
  |                  |                   |                      |                                    |                 | add to userinfo: on     |
  |                  |                   |                      |                                    |                 | multivalued: off        |
  |                  |                   |                      |                                    |                 | aggr attrib values: off |
  | email            | User Property     | email                | email                              | String          | Add to ID token: on     |
  |                  |                   |                      |                                    |                 | Add to access token: on | 
  |                  |                   |                      |                                    |                 | add to userinfo: on     |
  | realm roles      | User Realm Role   | realm roles          | realm_access.roles                 | String          | Add to ID token: off    |
  |                  |                   |                      |                                    |                 | Add to access token: on | 
  |                  |                   |                      |                                    |                 | add to userinfo: off    |
  | client roles     | User Client Role  | N/A                  | resource_access.${client_id}.roles | String          | Add to ID token: off    |
  |                  |                   |                      |                                    |                 | Add to access token: on | 
  |                  |                   |                      |                                    |                 | add to userinfo: off    |
  | username         | User Property     | username             | preferred_username                 | String          | Add to ID token: on     |
  |                  |                   |                      |                                    |                 | Add to access token: on | 
  |                  |                   |                      |                                    |                 | add to userinfo: on     |
  | groups           | Group Membership  | N/A                  | groups                             | N/A             | Full group path: on     |
  |                  |                   |                      |                                    |                 | Add to ID token: on     | 
  |                  |                   |                      |                                    |                 | Add to access token: on | 
  |                  |                   |                      |                                    |                 | add to userinfo: on     |

2. Create a grafana client
   - Change the following configuration items
      - access type: confidential _this will enable a "Credentials" tab within the client configuration page_
      - Direct Access Grants Enabled: Off
      - Valid Redirect URIs: https://grafana.DOMAIN/login/generic_oauth
      - Base URL: https://grafana.DOMAIN
    - Set Client Scopes
      - Default Client Scopes: Grafana (the client scope you created in the previous step)
      - optional client scopes: N/A
    - Take note of the client secret in the credential tab

#### Prometheus
1. Create a prometheus client
   - Change the following configuration items
      - access type: confidential _this will enable a "Credentials" tab within the client configuration page_
      - Direct Access Grants Enabled: Off
      - Valid Redirect URIs: https://prometheus.DOMAIN/login/generic_oauth
      - Base URL: https://prometheus.DOMAIN
    - Take note of the client secret in the credential tab

#### Alertmanager
1. Create an alertmanager client
   - Change the following configuration items
      - access type: confidential _this will enable a "Credentials" tab within the client configuration page_
      - Direct Access Grants Enabled: Off
      - Valid Redirect URIs: https://alertmanager.DOMAIN/login/generic_oauth
      - Base URL: https://alertmanager.DOMAIN
    - Take note of the client secret in the credential tab

## Grafana Configuration
Grafana configuration can be set via the editing the following section in the chart's values.
* It is recommended to utilize BigBang's encrypted helm values support to paste in the client_secret directly.
* Below config are example BigBang values for enabling and configuring OIDC support:
```
sso:
  oidc:
    host: login.dso.mil
    realm: baby-yoda
  certificate_authority: ''

monitoring:
  sso:
    enabled: true
    grafana:
      client_id: ""
      client_secret: ""
      scopes: "Grafana" # default 'openid profile email'
      allow_sign_up: "true" # true/false if Grafana will auto-create users from Keycloak after successful first login

```
* The root_url setting DOES NOT need to be edited if you filled in your "hostname" variable in your values file and istio is enabled, update only if desiring a different prefix or if not using HTTPS.
* Setting monitoring.sso.enabled=true in BigBang values will set Grafana OIDC to enabled.
* Update role_attribute_path to either "Editor" or "Admin" to allow all OIDC created users to be able to edit dashboards or administer the grafana install.

### Enabling Grafana OIDC in BigBang
```
monitoring:
  sso:
    enabled: true
    grafana:
      client_id: grafana
      client_secret: secret
```
### OIDC Custom CA

Grafana can establish trust using a CA cert file with OIDC auth connections.  An example of this when using Big Bang to deploy grafana with a secret named grafana-oidc-secret is below.  This assumes the secret is created in the same namespace (an exampel of secret creation can also be found below):



```
monitoring:
  sso:
    enabled: true
    grafana:
      scopes: "Grafana" #this is a sample client scope, review docs/KEYCLOAK.md
      allow_sign_up: "true"
      role_attribute_path: "Viewer"
      tls_client_cert: ""
      tls_client_key: ""
      tls_client_ca : "/etc/oidc/ca.pem"
      tls_skip_verify_insecure: false
      client_id: "grafana"    #this is a sample client_id, review docs/KEYCLOAK.md
      client_secret: "secret" #this is a sample secret, review docs/KEYCLOAK.md
      auth_url: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/auth
      token_url: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/token
      api_url: https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/userinfo
      # allowed_domains: ""
      # empty_scopes: false
      
      


monitoring:
  values:
    grafana:
      extraSecretMounts:
        - name: "oidc-ca-cert"
          mountPath: "/etc/oidc/ca.pem"
          secretName: "grafana-oidc-secret"
          readOnly: true
          subPath: "ca.pem"
```
Secret creation example that works with this example"
```bash
kubectl create secret generic grafana-oidc-secret --from-file=ca.pem=/path/to/cert.pem -n monitoring
```


## Prometheus + Alertmanager Configuration
Configuration of Keycloak/OIDC auth in front of Prometheus+Alertmanager requires the following:

```
sso:
  oidc:
    host: login.dso.mil
    realm: baby-yoda
  certificate_authority: ''
  jwks: ""

monitoring:
  sso:
    enabled: true
    kiali:
      client_id: ""
      client_secret: ""
    jaeger:
      client_id: ""
      client_secret: ""

authservice:
  enabled: true
```
* Configuration above is for BigBang, chains for authservice are automatically populated when above settings are present.
* Setting monitoring.sso.enabled to true installs an HAProxy container in the authservice namespace which works in conjunction with Authservice itself to place an OIDC redirect in front of Prometheus+Alertmanager.
* When monitoring.sso.enabled is set to true, the Prometheus+Alertmanager VirtualServices are replaced with ones that route to the HAProxy Deployment rather than directly to the services themselves.
