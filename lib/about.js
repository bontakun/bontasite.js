module.exports.aboutRequest = aboutRequest;

function aboutRequest(request, response) {
    response.render('about', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "about",
        }
    });
}