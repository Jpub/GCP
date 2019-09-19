const crc = require('fast-crc32c');
const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');
const table = instance.table('todo');

const userId = 'user-84';
const itemId = 'item-24';
const notes = 'This was a few days later than expected';

const userHash = crc.calculate(userId).toString(16);
const itemHash = crc.calculate(itemId).toString(16);
const key = userHash + itemHash;

const entries = [{
  key: key,
  data: {
    completed: {
      'item-id': itemId,
      'notes': notes
    }
  }
}];

table.insert(entries, (err, insertErrors) => {
  console.log('Added rows:', entries);
});