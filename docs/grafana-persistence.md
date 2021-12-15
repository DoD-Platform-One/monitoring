# Grafana Persistence

Grafana needs a database to store users and dashboards (and other things). By default it is configured to use sqlite3 which is an embedded database (included in the main Grafana binary).

You can also configure this to be an in-cluster/external mysql or postgresql database.

Another option is to allow this sqlite3 DB to be stored on a K8S PersistentVolume.

## PersistentVolume

To back Grafana with a PersistentVolume use the following values within the chart:

```yaml
persistence:
  type: pvc
  enabled: true
  # storageClassName: gp2
  accessModes:
    - ReadWriteOnce
  size: 10Gi
  # annotations: {}
  finalizers:
    - kubernetes.io/pvc-protection
  # selectorLabels: {}
  # subPath: ""
  # existingClaim:
```

## Database

To configure Grafana to utlize a Database:

Create a secret within the monitoring namespace named "postgres-creds" with keys for `username` and `password`.

```yaml
envValueFrom:
  DB_USER:
    secretKeyRef:
      key: username
      name: postgres-creds
  DB_PASSWORD:
    secretKeyRef:
      key: password
      name: postgres-creds
grafana.ini:
  database:
    type: "postgres"
    host: "postgresql-database.postgres.svc.cluster.local:5432/grafana"
    # name: DB_NAME
    ssl_mode: disable 
    user: $__env{DB_USER}
    password: $__env{DB_PASSWORD}
```

Review more database options from the [upstream documentation](https://grafana.com/docs/grafana/latest/administration/configuration/#database).