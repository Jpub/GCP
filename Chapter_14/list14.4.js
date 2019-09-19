const vision = require('@google-cloud/vision')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

vision.detectLabels('dog.jpg', {verbose: true}).then((data) => {
  const labels = data[0]
    .filter((label) => { return label.score > 75; })
    .map((label) => { return label.desc; });
  console.log('Accurate labels:', labels.join(', '));
});