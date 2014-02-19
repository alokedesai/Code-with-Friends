
/**
 * Module dependencies.
 */

var express = require('express');
var gaikan = require('gaikan');
var Firebase = require('firebase');
var myRootRef = new Firebase('https://fire-base-test.firebaseio.com/');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.configure(function(){
    // Use Gaikan as the HTML view renderer
    app.engine('html', gaikan);
    app.set('view engine', 'html');

    // Set up passport magic
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get("/test", function(req,res) {
	res.render("layout.html")
});
app.get("/:anything", function(req,res) {
	res.render("layout.html")
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
