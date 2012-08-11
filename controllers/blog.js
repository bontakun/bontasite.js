module.exports = {
    request: pageRequest,
    postRequest: postRequest
};

function responseCallBack(response, posts, nextPage, previousPage) {
    response.render('blog', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "blog",
            posts: posts,
            nextPage: nextPage,
            previousPage: previousPage
        }
    });
}

function pageRequest(request, response) {
    var page = parseInt(request.params.pageNumber);
    
    var blogModel = require("../models/blog.js").selectPostsWithOffset(
            page && page > 0 ? (page - 1) * 5 : 0, 
            function (posts) {
        responseCallBack(
            response, posts, 
            page && page > 0 ? page + 1 : 2, 
            page - 1);
    });    
}

function postRequest(request, response) {
    var postName = request.params.post;
    var blogModel = require("../models/blog.js").selectPostByTitle(postName, function (posts) {
        responseCallBack(response, posts);
    });
}