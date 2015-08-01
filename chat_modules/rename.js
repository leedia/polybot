var client = require("../methods");

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.rename (.+)/);
	if (match) {
		var name = match[1];
		client.renameChat(ev, name);
	}
});
