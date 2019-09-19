exports.echoText = (req, res) => {
	if (req.get('content-type') !== 'text/plain') {
		res.status(400).send('I only know how to echo text!');
	} else {
		res.status(200).send(req.body);
	}
};