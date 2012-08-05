module.exports = {
	blogRequest: blogRequest,
	blogPostRequest: blogPostRequest
};

function responseCallBack(response, posts) {
	response.render('blog', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "blog",
            posts: posts
        }
    });
}

function blogRequest(request, response) {
	var page = request.params.pageNumber;
	
	if (page && parseInt(page) && page > 0)
		page--;
	
	
	var blogModel = require("../models/blog.js").selectPostsWithOffset(page ? page * 5 : 0, function (posts) {
		responseCallBack(response, posts);
	});	
}

function blogPostRequest(request, response) {
	var postName = request.params.post;
	var blogModel = require("../models/blog.js").selectPostByTitle(postName, function (posts) {
		responseCallBack(response, posts);
	});
}