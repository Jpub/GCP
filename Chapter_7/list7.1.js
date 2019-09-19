const bigtable = require('@google-cloud/bigtable')({
  projectId: 'your-project-id'
});

console.log('Listing your instances and clusters:');

bigtable.getInstances().then((data) => {
  const instances = data[0];
  for (let i in instances) {
    let instance = instances[i];
    console.log('- Instance', instance.id);
    instance.getClusters().then((data) => {
      const clusters = data[0];
      const cluster = clusters[0];
      console.log(' - Cluster', cluster.id);
    });
  }
});