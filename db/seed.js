var Read = require('./connection.js')['Read']
var seedData = require('./seeds.json')

Read.remove({}).then(function() {
  Read.collection.insert(seedData).then(function(){
    console.log('finished');
    process.exit()
  });
});
