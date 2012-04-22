var sqlite3 = require('sqlite3').verbose();
var showdown = require('showdown');

//this path needs to be somewhat dynamic, I need to work on that.
var db = new sqlite3.Database(
    '/Users/ben/Sites/bontablog/data/blogPosts.db3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

module.exports.blogRequest = blogRequest;

function blogRequest(request, response) {
    var post = request.params.post;
    if (post) {
        getSingleBlogPost(post, response);
    } else {
        getAllBlogPosts(response);
    }
}

function getAllBlogPosts(res) {
    var records = [];
    db.each("SELECT * FROM blogPosts LIMIT 10", {}, function (err, row) {
        records.push(convertRowToPost(row));
    }, function() {
        renderBlog("blog", records, res);
    });
}

function getSingleBlogPost(post, res) {
    db.get("SELECT * FROM blogPosts WHERE id = ?", post, function (err, row) {
        if (err || !row) {
            console.log("Got error, or bad record from database [" 
                + err + "], falling back to displaying all posts");
            getAllBlogPosts(res);
        } else {
            var title = "blog";
            var records = [];
            records.push(convertRowToPost(row));
            renderBlog(title, records, res);
        }
    });
}

function convertRowToPost(row) {
    var date = new Date(1000 * row["timestamp"]);
    var dateString = 
        (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(); 
    
    return {
        id: row["id"],
        title: row["title"],
        body: showdown.convertMarkdown(row["body"]),
        timestamp: dateString
    }
}

function renderBlog(title, posts, res) {
    res.render('blog', {
         locals: {
          node_server_url: 'http://ve.bonta-kun.net',
          title: title,
          posts: posts
      }
  });
}

function createTable() {
    db.run("CREATE TABLE blogPosts("
        + "id INTEGER PRIMARY KEY, title VARCHAR(100), "
        + "body TEXT, timestamp INTEGER);");
}

function insertPost(title, body) {
    db.run("INSERT INTO blogPosts (title, body, timestamp) "
        + "VALUES (?, ?, strftime('%s', 'now'));", title, body);
    
}