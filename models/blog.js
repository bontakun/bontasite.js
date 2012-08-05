module.exports = {
	selectPostsWithOffset: selectPostsWithOffset,
	selectPostByTitle: selectPostByTitle
};

var queryForPosts = 
	"SELECT post_name, post_date_gmt, post_content, post_title " +
	"FROM wp_posts WHERE post_type = 'post' AND post_status = 'publish' " +
	"ORDER BY Id DESC LIMIT 5 OFFSET ?";

var queryForPostsByName = 
	"SELECT post_name, post_date_gmt, post_content, post_title " +
	"FROM wp_posts WHERE post_type = 'post' AND post_status = 'publish' AND post_name = ?";

	
function getConnection() {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host         : 'hostname',
		user         : 'username',
		password     : 'password',
		database     : 'database',
		charset     : 'UTF8_GENERAL_CI',
		insecureAuth : true
	});
	return connection;
}

function selectPostsWithOffset(offset, callback) {
	var conn = getConnection();
	var query = conn.query(queryForPosts, [offset], function (err, rows) {
		parseResults(err, rows, callback);
	});
	conn.end();
}

function selectPostByTitle(title, callback) {
	var conn = getConnection();
	var query = conn.query(queryForPostsByName, [title], function (err, rows) {
		parseResults(err, rows, callback);
	});
	conn.end();
}

function parseResults(err, rows, callback) {
	var posts = [];

	if (err) {
		console.log(err);
	} else {
		for (var i = 0; i < rows.length; i++) {
			posts.push({
				id: rows[i]['post_name'],
				date: rows[i]['post_date_gmt'].getFullYear(),
				title: rows[i]['post_title'],
				body: rows[i]['post_content']
			})
		}
	}
	callback(posts);
}