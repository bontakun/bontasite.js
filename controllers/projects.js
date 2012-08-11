module.exports = {
	request: request
};

function request(request, response) {
    response.render('projects', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "projects"
        }
    });
}