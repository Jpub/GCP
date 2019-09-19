const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');
const table = instance.table('users');

getKeyRanges().then((ranges) => {
  for (let range in ranges) {
    runOnWorkerMachine(() => {
      table.createReadStream({
        start: range.start,
        end: range.end
      }).on('data', (row) => {
        addRowToMachineLearningModel(row);
      });
    })
  }
});