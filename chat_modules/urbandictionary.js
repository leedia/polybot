var client = require("../methods");
var request = require("request");
request.encoding = "UTF-8";
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.ud (.+)/);
	if (match !== null) {
		var word = match[1];
		client.startTyping(ev);
		request("http://www.urbandictionary.com/define.php?term=" + encodeURI(word), function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var definition = $(".meaning").first().text();
				if(definition !== "") client.replyMessage(ev, definition);
				else client.replyMessage(ev, "No definitions found.");
			} else {
				client.replyMessage(ev, "error");
			}
			client.stopTyping(ev);
		});
	}
});
