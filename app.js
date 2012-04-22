var express = require('express');
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'mustache');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.register(".mustache", require('stache'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ 
        dumpExceptions: true, 
        showStack: true 
    }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
var index = require('./lib/index.js')
app.get('/', index.indexRequest);

var blog = require('./lib/blog.js');
app.get('/blog/:post?', blog.blogRequest);

var projects = require('./lib/projects.js');
app.get('/projects', projects.projectsRequest);

var contact = require('./lib/contact.js');
app.get('/contact', contact.contactRequest);

var about = require('./lib/about.js');
app.get('/about', about.aboutRequest);

app.listen(7401);
console.log("Express server listening on port %d", app.address().port);