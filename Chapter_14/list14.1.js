const vision = require('@google-cloud/vision')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

vision.detectLabels('dog.jpg').then((data) => {
  console.log('labels: ', data[0].join(', '));
});