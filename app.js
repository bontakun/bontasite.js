var express = require('express');
var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'mustache');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.register(".mustache", require('stache'));
});

app.configure('development', function() {
    app.use(express.errorHandler({ 
        dumpExceptions: true, 
        showStack: true 
    }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
var index = require('./controllers/index.js')
app.all('/', index.request);

//TODO: clean up this routing
var blog = require('./controllers/blog.js');
app.all('/blog/page/:pageNumber', blog.request);
app.all('/blog/post/:post', blog.postRequest);
app.all('/blog', blog.request);

var projects = require('./controllers/projects.js');
app.all('/projects', projects.request);

var contact = require('./controllers/contact.js');
app.all('/contact', contact.request);

var about = require('./controllers/about.js');
app.all('/about', about.request);

//var fourOFour = require('./controllers/404.js');
//app.all('*', fourOFour.request);

app.listen(7401);
console.log("Express server listening on port %d", app.address().port);

process.on('uncaughtException', function(error) {
  console.error("Uncaught exception occurred: " + error);
});