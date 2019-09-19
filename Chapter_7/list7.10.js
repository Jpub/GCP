const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');
instance.createTable('todo-imported', {
  families: ['completed']
});