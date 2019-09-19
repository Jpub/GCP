const spanner = require('@google-cloud/spanner')({
  projectId: 'your-project-id'
});
const instance = spanner.instance('test-instance');
const database = instance.database('test-database', {
  max: 5
});
const table = database.table('employees');

Promise.all([database.runTransaction(), database.runTransaction()]).then(
  (txns) => {
    const txn1 = txns[0][0], txn2 = txns[1][0];
    
    const printCommittedEmployeeData = () => {
      const allQuery = {
        keys: ['1'],
        columns: ['name', 'start_date']
      };
      return table.read(allQuery).then((results) => {
        console.log('table:', results[0]);
      });
    }
    
    const printNameFromTransaction1 = () => {
      const nameQuery = {
        keys: ['1'],
        columns: ['name']
      };
      return txn1.read('employees', nameQuery).then((results) => {
        console.log('txn1:', results[0][0]);
      });
    }
    
    const printStartDateFromTransaction2 = () => {
      const startDateQuery = {
        keys: ['1'],
        columns: ['start_date']
      };
      return txn2.read('employees', startDateQuery).then((results) => {
        console.log('txn2:', results[0][0]);
      });
    }
    const changeNameFromTransaction1 = () => {
      txn1.update('employees', {
        employee_id: '1',
        name: 'Steve Jobs (updated)'
      });
      return txn1.commit().then((results) => {
        console.log('txn1:', results);
      });
    }
    
    const changeStartDateFromTransaction2 = () => {
      txn2.update('employees', {
        employee_id: '1',
        start_date: '1976-04-02'
      });
      return txn2.commit().then((results) => {
        console.log('txn2:', results);
      });
    }

    const printNameAndStartDateFromTransaction2 = () => {
      const startDateQuery = {
        keys: ['1'],
        columns: ['name', 'start_date']
      };
      return txn2.read('employees', startDateQuery).then((results) => {
        console.log('txn2:', results[0][0]);
      });
    }

    printCommittedEmployeeData()
      .then(printNameFromTransaction1)
      .then(printStartDateFromTransaction2)
      .then(changeNameFromTransaction1)
      .then(changeStartDateFromTransaction2)
      .then(printCommittedEmployeeData)
      .catch((error) => {
          console.log('Error!', error.message);
      });
  }
);