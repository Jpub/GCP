const translate = require('@google-cloud/translate')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const detectLanguageOfPhoto = (photo) => {
  translate.detect(inputs).then((response) => {
    const result = response[0][0];
    if (result.confidence > 0.1) {
      photo.detectedLanguage = result.language;
      photo.save();
    }
  });
};