var express = require("express");//bringing in  node module express
var hbs     = require("express-handlebars");
var bodyParser = require('body-parser');
var Read = require("./db/connection")['Read'];

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
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/reads", function(req, res){
 Read.find({}).then(function(reads){
   res.render("reads-index", {
     reads: reads
     });
  });
});

app.get("/reads/:title", function(req, res){

  Read.findOne({title: req.params.title}).then(function(read){
    res.render("reads-show", {
      read: read
    });
  });
});
app.post('/reads', function(req, res){
  Read.create(req.body.read).then(function(read){
    res.redirect('/reads/' + read.title)
  });
});
app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
