const pubsub = require('@google-cloud/pubsub')({
	projectId: 'your-project-id'
});

let machineId;
const topic = pubsub.topic('money-spent');

const broadcastBid = (bid) =>{

	return topic.publish({
			data: bid.amount,
			attributes: {
				machineId: machineId,
				itemId: bid.item.id
			}
		}, {raw: true});
}

const broadcastRefund = (bid) =>{
	returntopic.publish({
		data: -1 * bid.amount,
		attributes: {
			machineId: machineId,
			itemId: bid.item.id
		}
	}, {raw: true});
}