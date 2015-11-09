var imageSend = require("../lib/imageSend");

var client = require("../methods");

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/(https?:\/\/.*\.(?:png|jpe?g|gif(?!v)))/i);
	if (match) {
		imageSend(match[0], ev);
	}
});
