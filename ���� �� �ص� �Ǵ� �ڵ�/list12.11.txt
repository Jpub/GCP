const moment = require('moment');

exports.echo = (req, res) => {
	let now = moment();
	let christmas2016 = moment('2016-12-25');
	
	let responseContent = {
		from: 'Cloud Functions',
		christmas2016: moment.duration(christmas2016 - now).humanize(true)
	};
	
	let contentType = req.get('content-type');
	
	if (contentType == 'text/plain') {
		responseContent.echo = req.body;
	} else if (contentType == 'application/json') {
		responseContent.echo = req.body.data;
	} else {
		responseContent.echo = JSON.stringify(req.body);
	}
	res.status(200).send(responseContent);
};