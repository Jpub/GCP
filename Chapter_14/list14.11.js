const vision = require('@google-cloud/vision')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

vision.detectLogos('logo.png').then((data) => {
  const logos = data[0];
  console.log('Found the following logos:', logos.join(', '));
});