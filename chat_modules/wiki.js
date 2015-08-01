var client = require("../methods");
var request = require("request");

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.wiki (.+)/);
	if (match ) {
		client.startTyping(ev);
		request("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exchars=420&explaintext&redirects=&titles=" + match[1], function(error, response, body) {
			var res = JSON.parse(body);
      var summary = res.query.pages[Object.keys(res.query.pages)[0]].extract;
      if(summary === undefined) client.replyMessage(ev, "no results found");
      else client.replyMessage(ev, summary);
			client.stopTyping(ev);
		});
	}
});
