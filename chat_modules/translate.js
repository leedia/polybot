var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.t (.+)/);
	if (match !== null) {
		client.startTyping(ev);
		var query = match[1];
		request("https://translate.google.com/?text=" + query, function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var translated = $("#result_box").text();
				client.replyMessage(ev, translated);
			} else {
				client.replyMessage(ev, "error");
			}
			client.stopTyping(ev);
		});
	}
});
