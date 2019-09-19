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
speech.recognize(audioFilePath, config).then((response) => {
  const result = response[0][0];
  console.log('This audio file says: "' + result.transcript + '"',
      '(with ' + Math.round(result.confidence) + '% confidence)');
});