var express = require('express');
var app = express();

var mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

// Enable partials
//app.engine('mst', mustache(VIEWS_PATH + '/partials', '.mst'));

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Routes
var index = require('./controllers/index.js');
app.all('/', index.request);

//TODO: clean up this routing
// var blog = require('./controllers/blog.js');
// app.all('/blog/page/:pageNumber', blog.request);
// app.all('/blog/post/:post', blog.postRequest);
// app.all('/blog', blog.request);

// var projects = require('./controllers/projects.js');
// app.all('/projects', projects.request);

// var contact = require('./controllers/contact.js');
// app.all('/contact', contact.request);

// var about = require('./controllers/about.js');
// app.all('/about', about.request);

// var gameServerStatus = require('./controllers/gameServerStatus.js');
// app.all('/gameServerStatus', gameServerStatus.request);

//var fourOFour = require('./controllers/404.js');
//app.all('*', fourOFour.request);

app.listen(8080);

app.listen(80);
app.listen(443);
console.log("Express server listening.");

process.on('uncaughtException', function(error) {
  console.error("Uncaught exception occurred: " + error);
});