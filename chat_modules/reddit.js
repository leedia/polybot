var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/(^| |(https?:\/\/)?(www\.)?reddit\.com)\/?r\/(\S+)( |$)/);
	if (match) {
		client.startTyping(ev);
		var sub = match[4];
		request("https://reddit.com/r/" + sub, function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var subdescription = $("title").text();
				var points = "";
				if(sub.match("comments")) points = $(".linkinfo .score").text();
				var linkbuilder = new client.Client.MessageBuilder();
				var segments = linkbuilder.link("/r/" + sub, "https://reddit.com/r/" + sub).text(" - " + subdescription + " ").bold(points).toSegments();
				client.replySegments(ev, segments);
			} else {
				client.replyMessage(ev, "error");
			}
			client.stopTyping(ev);
		});
	}
});
