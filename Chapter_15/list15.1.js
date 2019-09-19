const language = require('@google-cloud/language')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

language.detectSentiment('This car is really pretty.').then((result) => {
  console.log('Score:', result[0]);
});