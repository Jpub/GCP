const express = require('express');
const app = express();

app.post('/message', (req, res) => {
	console.log('Got message:', req.message);
	res.status(204).send()
});