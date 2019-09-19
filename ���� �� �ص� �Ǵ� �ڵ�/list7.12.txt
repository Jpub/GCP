const bigtable = require('@google-cloud/bigtable')({
	projectId: 'your-project-id'
});

const instance = bigtable.instance('test-instance');
const table = instance.table('users');

const getFollowers = (userId) => {
  const row = table.row(userId);
  return row.get(['followed-by']).then((data) => {
      return Object.keys(row.data);
  });
}