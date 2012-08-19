module.exports = {
	request: request
};

function responseCallBack(response, serverInfos) {
	response.render('gameServerStatus', {
        locals: {
            node_server_url: 'http://ve.bonta-kun.net',
            title: "Game Servers",
            servers: addImagesToServerInfos(serverInfos)
        }
    });
}

function request(request, response) {
	require("steam-server-status").getServerStatus(
			'tf.bonta-kun.net', 27015, function(serverInfo) {
		responseCallBack(response, [ serverInfo ]);
	});
}

function addImagesToServerInfos(serverInfos) {
	for (var i = 0; i < serverInfos.length; i++) {
		serverInfos[i].image = extractImageFromGameDirectory(serverInfos[i].gameDirectory);
	}
	return serverInfos;
}

function extractImageFromGameDirectory(gameDirectory) {
	if (gameDirectory == "tf") {
		return {
			url: "/images/games/tf2/Crew.jpg",
			height:"299px",
			width: "930px"
		}
	}
	return null;
}