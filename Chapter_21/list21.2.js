const pubsub = require('@google-cloud/pubsub')({
	projectId: 'your-project-id'
});

const topic = pubsub.topic('first-topic');
const subscription = topic.subscription('first-subscription');
subscription.pull().then((data) => {
	const message = data[0][0];
	console.log('Got message', message.id, 'saying', message.data);
});

> Got message 105838342611690 saying Hello world!