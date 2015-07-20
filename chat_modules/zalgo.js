var client = require("../methods");
var zalgo = require('zalgolize');

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.zalgo (.+)/);
	if (match) {
		var z = match[1];
		client.replyMessage(ev, zalgo(z, 0.7, [9, 2, 8]));
	}
});
