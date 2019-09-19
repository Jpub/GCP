exports.logPubSubMessage = (event, callback) => {
	const msg = event.data;
	console.log('Got message ID', msg.messageId);
	callback();
};