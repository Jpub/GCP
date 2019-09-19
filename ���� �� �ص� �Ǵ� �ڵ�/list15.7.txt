const language = require('@google-cloud/language')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

language.detectEntities('Hugo Chavez era de Venezuela.', {
  verbose: true,
  language: 'es'
}).then((result) => {
  console.log(result[0]);
});