var client = require("../methods");

client.chat.on("message", function(ev, msg) {
	if (msg.toLowerCase().match(/poly/)) {
		client.readChat(ev);
	}
});
