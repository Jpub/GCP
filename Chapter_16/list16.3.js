const fs = require('fs');
const speech = require('@google-cloud/speech')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const audioFilePath = 'gs://cloud-samples-tests/speech/brooklyn.flac';
const config = {
  encoding: 'FLAC',
  sampleRate: 16000,
  verbose: true
};

speech.startRecognition(audioFilePath, config).then((result) => {
  const operation = result[0];
  operation.on('complete', (results) => {
    console.log('This audio file says: "' + results[0].transcript + '"',
        '(with ' + Math.round(results[0].confidence) + '% confidence)');
  });
});