module.exports.contactRequest = contactRequest;

function contactRequest(request, response) {
    response.render('contact', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "contact",
        }
    });
}