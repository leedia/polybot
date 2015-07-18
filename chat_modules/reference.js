var client = require("../methods");

client.chat.on("message", function(ev, msg) {
	if (msg == ".ref") {
		client.replyLink(ev, "https://github.com/a9io/polybot/blob/master/readme.md");
	}
});
