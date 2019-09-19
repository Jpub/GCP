const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
	projectId: 'your-project-id',
	keyFilename: 'key.json'
});

const dataset = bigquery.dataset('taxi_test');
const table = dataset.table('trips');

const addTripToBigQuery = (trip) => {
	return table.insert({
		pickup_time: trip.pickup_time.getTime() / 1000,
		dropoff_time: trip.dropoff_time.getTime() / 1000,
		fare_amount: trip.fare_amount
	});
}