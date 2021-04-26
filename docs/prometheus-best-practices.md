# Prometheus Best Practices

### Metric names
- Must comply with the data model for valid characters
- Should have a single word application prefix relevant to the domain it belongs to
- Must have a single unit
- Should use base units
- Should have a suffix describing the unit, in plural form
- Should represent the sam logical thing measured across all label dimensions

### Labels

- Use labels to differentiate the characters of what is being measured:
    -   api_http_requests_total - differentiate request types: operation="create | udpate | delete"
    -   api_request_duration_seconds - differentitate request stages: stage="extract | tranform | load"
    
### Base Units

- Prometheus does not have any units hard coded. 
- For better compatibility, base units should be used.

### Consoles & Dashboards

- For operational consoles focus on the most likely failure modes and how to use consoles to differentiate them.
- Take advantage of the structure of your services.
- Build separate dashboards for each service that include latency and errors for each service they communicate with.
- Have no more than 5 graphs on a console.
- Have no more than 5 plots on each graph.

### Instrumentation

- Instrument everything.
- Every library, subsystem, and service should have at least a few metric.
- Instrumentation should be an integral part of the code.
- Instantiate the metrics classes in the same file that they are used in.

### Histograms & Summaries

Histograms and summaries are more complex metric types.
A single histogram or summary creates a multitude of times and is more difficult to use correctly.

- Library support
  - Check the library support for histograms and summaries.
  
-Count & sum of observations
  - If sum of observations go down then you cannot apply rate. In rare instances, that rate is needed to be applied then add twp separate summaries, one for positive and one for negative observations, and combine the results later with suitable PromQL expressions.

### Apdex score

- The well-known Apdex score can be calculated similarly to counting observations.

### Quantiles

- You can use both summaries and histograms to calculate quantiles

### Alerting

- Keep alerting simple, alert on symptons, have good consoles to allow pinpointing causes, and avoid having pages that have no function.

### Recording Rules

- Consistent naming scheme for recording rules makes it easier to interpret the meaning of a rule at a glance. It avoids mistakes by making incorrect or meaningless calculations stand out.

### Pushgateway

- Only use Pushgateway in certain limited cases.
- Usually, the only valid use for the Pushgateway is for capturing outcomes of a service-level batch job.

### Remote Write Tuning

- Using remote write increases the memory footprint of Prometheus.
- All relevant parameters are found under the queue_config section of the remote write configuration.

Refer to the links below for additional best practices information. 

- [Metric & Labeling](https://prometheus.io/docs/practices/naming/)
 - [Consoles & Dashboards](https://prometheus.io/docs/practices/consoles/)
 - [Instrumentation](https://prometheus.io/docs/practices/instrumentation/)
- [Historgrams & Summaries](https://prometheus.io/docs/practices/histograms/)
- [Alerting](https://prometheus.io/docs/practices/alerting/)
- [Recording & Rules](https://prometheus.io/docs/practices/rules/)
-[Pushgateway](https://prometheus.io/docs/practices/pushing/)
-[Remote Write Tuning](https://prometheus.io/docs/practices/remote_write/)  




