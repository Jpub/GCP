const pubsub = require('@google-cloud/pubsub')({
	projectId: 'your-project-id'
});

let machineId;
const topic = pubsub.topic('money-spent');
const amountSpentUrl = 'http://ebaybidder.mydomain.com:8080/budgetAvailable.json';
let amountSpent;

startBidding = () =>{
	request(amountSpentUrl, (err, res, body) => {
		amountSpent = body;
		const subscription = topic.subscription(machineId + '-queue');
		subscription.on('message', (message) => {
			console.log('Money was spent!', message.data);
			amountSpent += message.data;
			message.ack();
		});
		bidOnItems();
	});
}