const translate = require('@google-cloud/translate')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const inputs = [
  ('Probleme kann man niemals mit derselben Denkweise lösen, ' +
    'durch die sie entstanden sind.'),
  'Yo soy Americano.'
];

translate.translate(inputs, {
  to: 'en'
}).then((response) => {
  const results = response[1].data.translations;
  results.forEach((result, i) => {
    console.log('Sentence', i + 1,
        'was detected as', result.detectedSourceLanguage);
  });
});