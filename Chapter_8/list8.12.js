const storage = require('@google-cloud/storage')({
	projectId: 'your-project-id'
	keyFilename: 'key.json'
});
const bucket = storage.bucket('my-example-bucket');
const file = bucket.file('private.txt');
file.getSignedUrl({
	action: 'read', // This is equivalent to HTTP GET.
	expires: new Date().valueOf() + 30 * 60000, // This says “30 minutes from now”
}, (err, url) => {
	console.log('Got a signed URL:', url);
});