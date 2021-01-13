# Monitoring Specific Keycloak Configuration

# Table of Contents
- Keycloak configuration
- Grafana configuration
- Prometheus+Alertmanager configuration

These are the items you need to configure after keycloak and Grafana are working on your cluster, or you are utilizing an external keycloak eg: login.dso.mil

## Keycloak Configuration

#### Grafana
1. Create a grafana client scope with the following mappings

  | Name             | Mapper Type       | Mapper Selection Sub | Token Claim Name                   | Claim JSON Type |
  |------------------|-------------------|----------------------|------------------------------------|-----------------|
  | profile          | User Attribute    | profile              | profile                            | String          |
  | email            | User Property     | email                | email                              | String          |
  | realm_roles      | User Realm Roles  | realm roles          | nickname                           | String          |
  | client roles     | User Client Roles | client roles         | resource_access.${client_id}.roles | String          |
  | audience resolve | Audience Resolve  | audience resolve     | N/A                                | N/A             |

2. Create a grafana client
   - Change the following configuration items
      - access type: confidential _this will enable a "Credentials" tab within the client configuration page_
      - Direct Access Grants Enabled: Off
      - Valid Redirect URIs: https://grafana.DOMAIN/login/generic_oauth
      - Base URL: https://grafana.DOMAIN
    - Set Client Scopes
      - Default Client Scopes: grafana (the client scope you created in the previous step)
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
Grafana configuration can be set via the editing the following section in the values file to look like:
```
grafana:
...
  grafana.ini
    server:
      root_url: https://grafana.{{ .Values.hostname }}/
    auth:
      signout_redirect_url: https://keycloak.DOMAIN/auth/realms/REALM/protocol/openid-connect/logout
    auth.generic_oauth:
      enabled = false
      client_id = $__file{/etc/secrets/oauthinfo/client_id}
      client_secret = $__file{/etc/secrets/oauthinfo/client_secret}
      scopes = openid profile email #Or configured Client Scope within Keycloak
      auth_url = https://keycloak.DOMAIN/auth/realms/REALM/protocol/openid-connect/auth
      token_url = https://keycloak.DOMAIN/auth/realms/REALM/protocol/openid-connect/token
      api_url = https://keycloak.DOMAIN/auth/realms/REALM/protocol/openid-connect/userinfo
      allow_sign_up = true
      role_attribute_path = Viewer
```
* The root_url setting DOES NOT need to be edited if you filled in your "hostname" variable in your values file, update for different prefix or if not using HTTPS.
* Enabled under auth.generic_oauth will need to be set to true to allow for OIDC authentication.
* Update role_attribute_path to either "Editor" or "Admin" to allow all OIDC created users to be able to edit dashboards or administer the grafana install.

To set the client_id and client_secret portions of the values file an "extraSecretMounts" portion of the values file will need to be declared under the grafana section:
```
grafana:
...
  extraSecretMounts:
    - name: oauthinfo
      mountPath: /etc/secrets/oauthinfo
      secretName: grafana-oauthinfo
      defaultMosde: 0440
      readOnly: true
```
The above configuration points to a kubernetes secret called "grafana-oauthinfo" which will need to be created with two configured key:value sets:
* client_id
* client_secret

The example secret would look like:

        apiVersion: v1
        kind: Secret
        metadata:
          name: grafana-oauthinfo
          namespace: monitoring
        stringData:
          client_id: ...
          client_secret: ...

* Ensure when using SOPS encryption that only the data or stringData entries are encrypted otherwise Flux will have issues reconciling the secret.


## Prometheus + Alertmanager Configuration
Configuration of Keycloak/OIDC auth in front of Prometheus+Alertmanager requires the following:

1. [Authservice](https://repo1.dso.mil/platform-one/big-bang/apps/sandbox/authservice) Installed in your cluster and individual chains for Prometheus+Alertmanager configured:
```
authservice:
  enabled: true
  values:
    chains:
      prometheus
        match:
          header: ":authority"
          prefix: "prometheus.DOMAIN"
        client_id: prometheus
        client_secret: secret-text
        callback_uri: https://prometheus.DOMAIN/login/generic_oauth
        cookie_name_prefix: hello_world
        logout_path: /logout
```
* When used in conjunction with Bigbang Umbrella, you can replace "DOMAIN" with "{{ .Values.hostname }}" and helm will utilize that filled in variable.
* Alertmanager chain looks identical just with alertmanager specific client_id, client_secret, prefix, and callback_uri.

2. Utilize the sso options for this monitoring package:
```
sso:
  enabled: false
  namespace: monitoring-sso
```
* Setting sso.enabled to true installs an HAProxy container in the defined namespace which works in conjunction with Authservice to place an OIDC redirect in front of Prometheus+Alertmanager.
* When sso.enabled is set to true, the Prometheus+Alertmanager VirtualServices are replaced with ones that route to the HAProxy Deployment rather than directly to the services themselves.

