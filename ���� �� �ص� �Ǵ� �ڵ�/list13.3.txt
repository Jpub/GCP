const dns = require('@google-cloud/dns')({
	projectId: 'your-project-id'
});
const zone = dns.zone('mydomain-dot-com');

const addRecords = [
	zone.record('a', {
		name: 'www.mydomain.com.',
		data: '10.0.0.1',
		ttl: 86400
	}),
	zone.record('cname', {
		name: 'docs.mydomain.com.',
		data: 'ghs.google.com.',
		ttl: 86400
	})
];

zone.createChange({add: addRecords}).then((data) => {
	const change = data[0];
	console.log('Change created at', change.metadata.startTime,
		'as Change ID', change.metadata.id);
	console.log('Change status is currently', change.metadata.status);
});