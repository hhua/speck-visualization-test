var server = require("./server/server");
var router = require("./server/router");
var requestHandlers = require("./server/requestHandlers");

var handle = {
	'/': requestHandlers.start,
	'/start': requestHandlers.start,
	'/getBodyTrack': requestHandlers.getBodyTrack
};

server.start(router.route, handle);

