const pubsub = require('@google-cloud/pubsub')({
	projectId: 'your-project-id'
});

const topic = pubsub.topic('first-topic');
topic.publish('Hello world!').then((data) => {
	const messageId = data[0][0];
	console.log('Message was published with ID', messageId);
});