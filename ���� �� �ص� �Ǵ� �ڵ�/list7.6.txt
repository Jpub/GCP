const crc = require('fast-crc32c');
const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');
const table = instance.table('todo');

const userId = 'user-2';
const userHash = crc.calculate(userId).toString(16);

table.createReadStream({
  start: userHash,
  end: (parseInt(userHash, 16) + 1).toString(16)
}).on('data', (row) => {
  console.log('Found row', row.id, row.data.completed);
}).on('end', () => {
  console.log('End of results.');
});