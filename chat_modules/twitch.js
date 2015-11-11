var imageSend = require("../lib/imageSend");
var request = require('request');

var client = require("../methods");

var getThumbnailUrl = function(stream, fn) {
	request("https://api.twitch.tv/kraken/streams/" + stream, function(err, res, body) {
		if (!err) {
			body = JSON.parse(body);
			if (body.stream) fn(body.stream.preview.medium);
		}
	});
};

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/twitch\.tv\/(\S+)\b/);
	if (match) {
		var stream = match[1];
		getThumbnailUrl(stream, function(thumbnailUrl) {
			client.startTyping(ev);
			imageSend(thumbnailUrl, ev, function() {
				client.replyMessage(ev, stream);
			});
		});
	}
});
