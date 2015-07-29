var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/https?:\/\/twitter\.com\/(.+)\/status\/(.+)/);
	if (match !== null) {
		client.startTyping(ev);
		request(msg, function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var username = $(".permalink-tweet .username").text();
				var tweet = $(".permalink-tweet .tweet-text").text();
				var builder = new client.Client.MessageBuilder();
				var segments = builder.bold(username + ": ").text(tweet).toSegments();
				client.replySegments(ev, segments);
			} else {
				client.replyMessage(ev, "error");
			}
			client.stopTyping(ev);
		});
	}
});
