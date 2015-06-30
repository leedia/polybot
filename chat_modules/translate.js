var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	if (msg.indexOf(".t ") === 0 && msg.length > 3) {
		client.startTyping(ev);
		var query = msg.substring(3);
		request.encoding = "UTF-8";
		request("https://translate.google.com/?text=" + encodeURI(query), function(error, response, body) {
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
