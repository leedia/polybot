var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.yt (.+)/);
	if (match ) {
		client.startTyping(ev);
		var query = match[1];
		request("https://www.youtube.com/results?search_query=" + query, function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var link = "https://youtube.com" + $(".section-list .yt-lockup-title .spf-link").first().attr("href");
				if (link == "https://youtube.comundefined") client.replyMessage(ev, "No videos found.");
				else {
					client.replyLink(ev, link);
					client.stopTyping(ev);
				}
			} else {
				client.replyMessage(ev, "error");
			}
		});
	}
});
