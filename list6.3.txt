const spanner = require('@google-cloud/spanner')({
  projectId: 'your-project-id'
});

const instance = spanner.instance('test-instance');
const database = instance.database('test-database');
const employees = database.table('employees');

employees.insert([
    {employee_id: 1, name: 'Steve Jobs', start_date: '1976-04-01'},
    {employee_id: 2, name: 'Bill Gates', start_date: '1975-04-04'},
    {employee_id: 3, name: 'Larry Page', start_date: '1998-09-04'}
  ]).then((data) => {
    console.log('Saved data!', data);
});