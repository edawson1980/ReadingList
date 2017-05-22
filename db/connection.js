var mongoose = require('mongoose')
var ReadSchema = new mongoose.Schema({
  title: String,
  author: String
})
var Read = mongoose.model('Read', ReadSchema)
mongoose.connect('mongodb://localhost/readinglist')

//var seedData = require("./seeds.json");
module.exports = {
  Read: Read
};
