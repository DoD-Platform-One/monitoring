# Prometheus Back up & Recovery

## Backup

To back up a Prometheus deployment on Kubernetes, back up the persistent volumes from the source deployment, then reattach the volumes to the new deployment.  This can be accomplished using a backup and restore tool called Velero.

- Install Velero on the source and destination clusters.
- Use Velero to back up the PersistentVolumes (PVs) utilized by the deployment on the source cluster.

## Recovery

To restore a Prometheus deployment on Kubernetes, use Veloro's backed-up PVs on the destination cluster. Create new deployment on the destination cluster with the same chart, deployment name, credentials and other parameters as the original.
The new deployment will use the restored PVs which will give the original data.

## Additional links

The below links provide more resources Prometheus Backup and Recovery:

- [Velero](https://velero.io/)
- [Backing up & Restoring deployments](https://docs.bitnami.com/tutorials/backup-restore-bitnami-deployments-velero)
