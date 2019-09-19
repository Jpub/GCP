const language = require('@google-cloud/language')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const caption = 'SpaceX lands on Mars! Fantastic!';
const document = language.document(caption);
const options = {
  entities: true,
  sentiment: true,
  verbose: true
};

document.annotate(options).then((data) => {
  const sentiment = data[0].sentiment;
  const entities = data[0].entities;
  const suggestedTags =
      getSuggestedTags(sentiment, entities);
  console.log('The suggested tags are', suggestedTags);
  console.log('The suggested caption is',
      '"' + caption + ' ' + suggestedTags.join(' ') + '"');
});