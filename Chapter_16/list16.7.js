const Q = require('q');
const language = require('@google-cloud/language')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const getSentimentAndEntities = (content) => {
  const document = language.document(content);
  const config = {
    entities: true,
    sentiment: true,
    verbose: true
  };
  return document.annotate(config).then(
    return new Q(data[0]); // { sentiment: {...}, entities: [...] }
  });
};