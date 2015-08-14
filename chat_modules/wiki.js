var client = require("../methods");
var request = require("request");

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.wiki (.+)/);
	if (match) {
		client.startTyping(ev);
		request("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exchars=420&explaintext&redirects=&titles=" + match[1], function(error, response, body) {
			var res = JSON.parse(body);
			var link = "https://en.wikipedia.org/wiki/" + match[1];
			var summary = res.query.pages[Object.keys(res.query.pages)[0]].extract;
			var linkbuilder = new client.Client.MessageBuilder();
			var segments = linkbuilder.link(summary, link).toSegments();
			if(summary) client.replySegments(ev, segments);
			else client.replyMessage(ev, "no results found");
			client.stopTyping(ev);
		});
	}
});
