const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');

instance.createTable('todo', {
  families: ['completed']
}).then((data) => {
  const table = data[0];
  console.log('Created table', table.id);
});