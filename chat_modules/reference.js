var client = require("../methods");
var request = require("request");

client.chat.on("message", function(ev, msg) {
	if (msg == ".ref") {
		client.replyLink(ev, "https://github.com/a9io/polybot/blob/master/readme.md");
	}
});
