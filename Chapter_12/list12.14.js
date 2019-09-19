const uuid4 = require('uuid/v4');
const Spanner = require('@google-cloud/spanner');

const spanner = Spanner();

const getDatabase = () => {
	const instance = spanner.instance('my-instance');
	return instance.database('my-db');
};

const createLogEntry = (data) => {
	const table = getDatabase().table('logs');
	let row = {log_id: uuid4(), log_data: data};
	return table.insert(row);
};

const countLogEntries = () => {
	const database = getDatabase();
	return database.run('SELECT COUNT(*) AS count FROM logs').then((data) => {
		let rows = data[0];
		return rows[0].toJSON().count.value;
	});
};

const getBodyAsString = (req) => {
	let contentType = req.get('content-type');
	if (contentType == 'text/plain') {
		return req.body;
	} else if (contentType == 'application/json') {
		return req.body.data;
	} else {
		returnJSON.stringify(req.body);
	}
};

exports.echo = (req, res) => {
	let body = getBodyAsString(req);
	returnPromise.all([
		createLogEntry('Echoing: ' + body),
		countLogEntries()
	]).then((data) => {
		res.status(200).send({ echo: body, logRowCount: data[1] });
	});
};