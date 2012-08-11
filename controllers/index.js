module.exports = {
	request: request
};

function request(request, response) {
    response.render('index', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net'
        }
    });
}