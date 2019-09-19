const datastore = require('@google-cloud/datastore')({
  projectId: 'your-project-id'
});

const query = datastore.createQuery('TodoList');

datastore.runQuery(query)
  .on('error', console.error)
  .on('data', (entity) => {
    console.log('Found TodoList:\n', entity);
  })
  .on('end', () => {
    console.log('No more TodoLists');
  });