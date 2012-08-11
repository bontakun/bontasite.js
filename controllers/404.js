module.exports = {
	request: request
};

function request(request, response) {
    response.render('404', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "404",
        }
    });
}