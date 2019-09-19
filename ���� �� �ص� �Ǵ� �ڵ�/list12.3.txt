exports.echo = (req, res) => {
	let responseContent = {
		from: 'Cloud Functions'
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