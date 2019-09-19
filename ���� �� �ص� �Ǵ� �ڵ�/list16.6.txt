const Q = require('q');
const speech = require('@google-cloud/speech')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const getTranscript = (videoBuffer) => {
  const deferred = Q.defer();
  
  extractAudio(videoBuffer).then((audioBuffer, audioConfig) => {
    const config = {
      encoding: audioConfig.encoding, // for example, 'FLAC'
      sampleRate: audioConfig.sampleRate, // for example, 16000
      verbose: true
    };
    return speech.startRecognition(audioBuffer, config);
  }).then((result) => {
    const operation = result[0];
    operation.on('complete', (results) => {
      const result = results[0];
      const transcript = result.confidence > 50 ? result.transcript : null;
      deferred.resolve(transcript);
    });
    
    operation.on('error', (err) => {
      deferred.reject(err);
    });
  }).catch((err) => {
    deferred.reject(err);
  });
  
  return deferred.promise;
};