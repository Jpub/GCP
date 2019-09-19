const vision = require('@google-cloud/vision')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

vision.detectText('card.png', {verbose: true}).then((data) => {
  const textAnnotations = data[0];
  textAnnotations.forEach((item) => {
    console.log(item);
  });
});