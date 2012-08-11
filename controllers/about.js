module.exports = {
	request: request
};

function request(request, response) {
    response.render('about', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "about",
        }
    });
}