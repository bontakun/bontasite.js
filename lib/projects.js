module.exports.projectsRequest = projectsRequest;

function projectsRequest(request, response) {
    response.render('projects', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "projects"
        }
    });
}