const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.listen(8080, '0.0.0.0', () => {
	console.log('Hello world app is listening on port 8080.');
});