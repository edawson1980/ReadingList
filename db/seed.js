var Read = require('./connection.js')['Read']
var seedData = require('./seeds.json')
var Read = mongoose.model("Read")
Read.remove({}).then(function() {
  Read.collection.insert(seedData).then(function(){
    console.log('finished');
    process.exit()
  });
});
