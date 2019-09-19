const language = require('@google-cloud/language')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const content = 'Barack Obama prefers an iPhone over a Blackberry when ' +
  'vacationing in Hawaii.';
const options = {verbose: true};

language.detectEntities(content, options).then((result) => {
  console.log(result[0]);
});