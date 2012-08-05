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
app.get('/', index.indexRequest);
app.post('/', index.indexRequest);

var blog = require('./controllers/blog.js');
app.get('/blog/page/:pageNumber', blog.blogRequest);
app.post('/blog/page/:pageNumber', blog.blogRequest);
app.get('/blog/:post', blog.blogPostRequest);
app.post('/blog/:post', blog.blogPostRequest);
app.get('/blog', blog.blogRequest);
app.post('/blog', blog.blogRequest);

var projects = require('./controllers/projects.js');
app.get('/projects', projects.projectsRequest);
app.post('/projects', projects.projectsRequest);

var contact = require('./controllers/contact.js');
app.get('/contact', contact.contactRequest);
app.post('/contact', contact.contactRequest);

var about = require('./controllers/about.js');
app.get('/about', about.aboutRequest);
app.post('/about', about.aboutRequest);

app.listen(7401);
console.log("Express server listening on port %d", app.address().port);