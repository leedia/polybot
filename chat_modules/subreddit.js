var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/r\/(.+)/);
	if (match !== null) {
		client.startTyping(ev);
		var sub = match[1];
		request("https://reddit.com/r/" + sub, function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var description = $("title").text();
				var linkbuilder = new client.Client.MessageBuilder();
				var segments = linkbuilder.link("/r/" + sub + " - " + description, "https://reddit.com/r/" + sub).toSegments();
				client.replySegments(ev, segments);
			} else {
				client.replyMessage(ev, "error");
			}
			client.stopTyping(ev);
		});
	}
});
