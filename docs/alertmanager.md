# Alertmanager

## Alertmanager Overview

Alertmanager is the frontend used for sending and managing alerts for a prometheus-stack installation. Out of the box this package installs a single replica of both prometheus and alertmanager which are pre-configured to sync. Alerts are evaluated and generated within Prometheus and then posted to the REST API for Alertmanager to manage based on it's configuration.

Upstream documentation can be rather sparse about exactly what's required to configure Alertmanager and what's recommended. This doc will go over setting up SMTP & webhook alerts destined for email inboxes and Mattermost (or slack) installations.

### SMTP Alert Configuration

It is recommended to keep the default 'null' receiver as that is where you can route non-important alerts like the built in Watchdog alert which only exists to show the end-user that the communication between Prometheus & Alertmanager is working as expected. [Here is a link to the full list of options available](https://prometheus.io/docs/alerting/latest/configuration/#email_config) for the `email_config` section within alertmanager.

```yaml
alertmanager:
  config:
    global:
      resolve_timeout: 5m
    route:
      # Keeping the default of 'job' but 'alertname' is also used often
      group_by: ['job']
      group_wait: 30s
      group_interval: 5m
      # repeat_interval upped from default of 12h
      repeat_interval: 24h
      # receiver updated from 'null' to 'smtp-email' so it becomes the default
      receiver: 'smtp-email'
      routes:
      - match:
          alertname: Watchdog
        receiver: 'null'
    receivers:
    - name: 'null'
    # Adding a new receiver below the default 'null' receiver
    - name: 'smtp-email'
      email_configs:
      - to: it@example.org
        from: no-reply@example.org
        smarthost: smtp.office365.org:587
        auth_username:
        auth_identity:
        auth_password:
        require_tls: true
        send_resolved: true

    templates:
    - '/etc/alertmanager/config/*.tmpl'
```

### Chat Webhook Alert Configuration

Alertmanager contains built in support for a few chat apps: slack, telegram & wechat. The included slack configuration can be used to send to [Mattermost Incoming Webhooks](https://docs.mattermost.com/developer/webhooks-incoming.html#simple-incoming-webhook) within an installation. Just like the example above we'll want to keep the existing receiver and route for the 'null' receiver so that the built in Watchdog alert isn't sent to your new receiver. [Here is a link to the full list of options available](https://prometheus.io/docs/alerting/latest/configuration/#slack_config) for the `slack_config` section within alertmanager, however to send to a mattermost incoming webhook, only the value show below is needed.

```yaml
alertmanager:
  config:
    global:
      resolve_timeout: 5m
    route:
      # Keeping the default of 'job' but 'alertname' is also used often
      group_by: ['job']
      group_wait: 30s
      group_interval: 5m
      # repeat_interval upped from default of 12h
      repeat_interval: 24h
      # receiver updated from 'null' to 'mattermost' so it becomes the default
      receiver: 'mattermost'
      routes:
      - match:
          alertname: Watchdog
        receiver: 'null'
    receivers:
    - name: 'null'
    # Adding a new receiver below the default 'null' receiver
    - name: 'mattermost'
      slack_configs:
      - api_url: https://chat.domain.url/hooks/AAAAAAAAAAAAAAA

    templates:
    - '/etc/alertmanager/config/*.tmpl'
```
