const translate = require('@google-cloud/translate')({
  projectId: 'your-project-id',
  keyFilename: 'key.json'
});

const photoUiComponent = getCurrentPhotoUiComponent();
const photo = getCurrentPhoto();
const viewer = getCurrentUser();
const translateButton = new TranslateUiButton({
  visible: shouldDisplayTranslateButton(photo, viewer),
  onClick: () => {
    photoUiComponent.setCaption('Translating...');
    translate.translate(photo.caption, {to: viewer.language})
      .then((response) => {
        photoUiComponent.setCaption(response[0][0]);
      })
      .catch((err) => {
        photoUiComponent.setCaption(photo.caption);
      });
  }
});