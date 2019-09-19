const vision = require('@google-cloud/vision')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

vision.detectFaces('kid.jpg').then((data) => {
  const rawFaces = data[1]['responses'][0].faceAnnotations;
  const faces = data[0];
  
  faces.forEach((face, i) => {
    const rawFace = rawFaces[i];
    console.log('How sure are we that there is a face?', face.confidence + '%');
    console.log('Are we certain the face looks happy?',
        rawFace.joyLikelihood == 'VERY_LIKELY' ? 'Yes' : 'Not really');
    console.log('Are we certain the face looks angry?',
        rawFace.angerLikelihood == 'VERY_LIKELY' ? 'Yes' : 'Not really');
  });
});