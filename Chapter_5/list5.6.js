const datastore = require('@google-cloud/datastore')({
  projectId: 'your-project-id'
});
const entity = {
  key: datastore.key(['TodoList', 5629499534213120, 'TodoItem']),
  data: {
    name: 'Milk',
    completed: false
  }
};

datastore.save(entity, (err) => {
  if (err) {
    console.log('There was an error...', err);
  } else {
    console.log('Saved entity:', entity);
  }
});