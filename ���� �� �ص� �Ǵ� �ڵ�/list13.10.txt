const request = require('request');

const metadataUrl = 'http://metadata.google.internal/computeMetadata/v1/';
const metadataHeader = {'Metadata-Flavor': 'Google'};

const getMetadata = (path) => {
	const options = {
		url: metadataUrl + path,
		headers: metadataHeader
	};
	return new Promise((resolve, reject) => {
		request(options, (err, resp, body) => {
			resolve(body) ? err === null : reject(err);
		});
	});
};

const getInstanceName = () => {
	return getMetadata('instance/name');
};

const getInstanceZone = () => {
	return getMetadata('instance/zone').then((data) => {
		const parts = data.split('/');
		return parts[parts.length-1];
	})
};

const getInstanceIp = () => {
	const path = 'instance/network-interfaces/0/access-configs/0/external-ip';
	return getMetadata(path);
};

const getInstanceDetails = () => {
	const promises = [getInstanceName(), getInstanceZone(), getInstanceIp()];
	return Promise.all(promises).then((data) => {
		return {
			name: data[0],
			zone: data[1],
			ip: data[2]
		};
	});
};