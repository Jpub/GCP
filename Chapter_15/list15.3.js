const language = require('@google-cloud/language')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const inputs = [
  'This car is nice. It also gets terrible gas mileage!',
  'This is a car.'
];

inputs.forEach((content) => {
  language.detectSentiment(content, {verbose: true})
    .then((result) => {
      const data = result[0];
      console.log([
        'Results for "' + content + '":',
        ' Score: ' + data.score,
        ' Magntiude: ' + data.magnitude
      ].join('\n'));
    });
});