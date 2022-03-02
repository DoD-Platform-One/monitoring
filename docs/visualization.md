# Visualization

Prometheus has great visualizations. It is equipped with multiple modes for visualizing data such as the built-in expression browser, Grafana integration, and a console template language.

## Expression Browser

The expression browser can be accessed at /graph on the Prometheus server. It allows users to enter any expression and view the results in a table or it can be graphed over time. The Expression Browser is mainly used for ad-hoc queries and debugging.

Refer to this [link](https://prometheus.io/docs/visualization/browser/) for additional Expression Browser information.

## Grafana

Grafana is an open-source visualization software which uses dashboards to help query, visualize, create alerts, and understand the complex data through utilization of data metrics.

Grafana supports querying Prometheus. The links below provide more information for Grafana and how to install.

- [Grafana Support For Prometheus](https://prometheus.io/docs/visualization/grafana/)
- [Installing Grafana](https://grafana.com/grafana/download)

## Console Templates

Console Templates utilizes the [Go templating language](https://golang.org/pkg/text/template/) for creation of arbitrary consoles on the Prometheus server. They are the most powerful method to create templates that can be easily managed in source control.

[Click to learn more about Console Templates.](https://prometheus.io/docs/visualization/consoles/)
