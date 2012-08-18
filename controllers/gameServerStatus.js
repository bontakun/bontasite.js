module.exports = {
	request: request
};

function responseCallBack(response, serverInfo) {
	response.render('gameServerStatus', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "Game Servers",
            servers: [ serverInfo ]
        }
    });
}

function request(request, response) {
	require("../models/gameServerStatus.js").getServerStatus('tf.bonta-kun.net', 27015, function(serverInfo) {
		responseCallBack(response, serverInfo);
	});
}