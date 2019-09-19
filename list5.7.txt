const datastore = require('@google-cloud/datastore')({
  projectId: 'your-project-id'
});
const itemNames = ['Eggs', 'Chips', 'Dip', 'Celery', 'Beer'];
const entities = itemNames.map((name) => {
  return {
    key: datastore.key(['TodoList', 5629499534213120, 'TodoItem']),
    data: {
      name: name,
      completed: false
    }
  };
});

datastore.save(entities, (err) => {
  if (err) {
    console.log('There was an error...', err);
  } else {
    entities.forEach((entity) => {
      console.log('Created entity', entity.data.name, 'as ID', 
     entity.key.id);
    })
  }
});