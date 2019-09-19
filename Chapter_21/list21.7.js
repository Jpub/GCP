const pubsub = require('@google-cloud/pubsub')({
	projectId: 'your-project-id'
});

const topic = pubsub.topic('bid-on-item');
const subscription = topic.subscription('bid-on-item-queue');

subscription.on('message', (message) => {
message.ack(() => {
bidOnItem(message);
	});
});