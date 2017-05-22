var express = require("express");//bringing in  node module express
var hbs     = require("express-handlebars");
var bodyParser = require('body-parser');
var mongoose = require("./db/connection");

var app     = express();



app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");//use hbs to view i type this one
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));//use css staff amlak
app.use(bodyParser.json({extended: true}));

app.get("/", function(req, res){
  res.render("reads");
});

app.get("/api/reads", function(req, res){
 Read.find({}).then(function(reads){
   res.json(reads)
  });
});

app.get("/api/reads/:title", function(req, res){

  Read.findOne({title: req.params.title}).then(function(read){
    res.json(read)
  });
});
app.post('/api/reads', function(req, res){
  Read.create(req.body.read).then(function(read){
    res.json(read)
  });

});
app.get("/*", function(req, res){
  res.render("reads")
})
app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
