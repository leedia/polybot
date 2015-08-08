var client = require("../methods");

client.chat.on("message", function(ev, msg) {
	if (msg.match(/poly/)) {
		client.readChat(ev);
	}
});
