const storage = require('@google-cloud/storage')({
	
});
const bucket = storage.bucket('my-first-bucket-jjg');
bucket.upload('my_second_file.txt', (err, file) => {
  if (err) {
    console.log('Whoops! There was an error:', err);
  } else {
    console.log('Uploaded your file to', file.name);
  }
});