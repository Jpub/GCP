const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
	projectId: 'your-project-id',
	keyFilename: 'key.json'
});

const query = `SELECT total_amount, pickup_datetime, trip_distance
	FROM \`bigquery-public-data.new_york_taxi_trips.tlc_yellow_trips_2018\`
	ORDER BY total_amount DESC
	LIMIT 1;`

bigquery.createQueryJob(query).then((data) => {
	const job = data[0];
	return job.getQueryResults({timeoutMs: 10000});
}).then((data) => {
	const rows = data[0];
	console.log(rows[0]);
});