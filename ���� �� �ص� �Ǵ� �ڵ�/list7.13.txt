const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');
const table = instance.table('users');

const getKeyRanges = () => {
  return table.sampleRowKeys().then((data) => {
    const ranges = [];
    const currentRange = {
      start: null,
      end: null
    };
    for (let splitPoint in data[0]) {
      currentRange.start = currentRange.end;
      currentRange.end = splitPoint.key;
      ranges.push(currentRange);
    }
  return ranges;
  })
}