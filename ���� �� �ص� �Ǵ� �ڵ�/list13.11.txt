const dns = require('@google-cloud/dns')({
	projectId: 'your-project-id'
});
const zone = dns.zone('mydomain-dot-com');

getInstanceDetails().then((details) => {
	return zone.record('a', {
		name: [details.name, details.zone].join('-') + '.mydomain.com.',
		data: details.ip,
		ttl: 86400
	});
}).then((record) =>{
	return zone.createChange({add: record});
}).then((data) => {
	const change = data[0];
	console.log('Change created at', change.metadata.startTime, 'as Change ID', change.metadata.id);
	console.log('Change status is currently', change.metadata.status);
});