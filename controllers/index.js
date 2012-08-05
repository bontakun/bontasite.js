module.exports.indexRequest = indexRequest;

function indexRequest(request, response) {
    response.render('index', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net'
        }
    });
}