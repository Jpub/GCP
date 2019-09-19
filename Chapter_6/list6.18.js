const spanner = require('@google-cloud/spanner')({
  projectId: 'your-project-id'
});
const instance = spanner.instance('test-instance');
const database = instance.database('test-database', {
  max: 2
});

const printRowCounts = (database, txn) => {
  const query = 'SELECT * FROM employees';
  return Promise.all([database.run(query), txn.run(query)]).then((results) => {
      const inside = results[1][0], outside = results[0][0];
      console.log('Inside transaction row count:', inside.length);
      console.log('Outside transaction row count:', outside.length);
  });
}

database.runTransaction({
  readOnly: true
}, (err, txn) => {
  printRowCounts(database, txn).then(() => {
    const table = database.table('employees');
    return table.insert({
      employee_id: 40,
      name: 'Steve Ross',
      start_date: '1996-01-23'
    });
  }).then(() => {
    console.log(' --- Added a new row! ---');
  }).then(() => {
    printRowCounts(database, txn);
  });
});