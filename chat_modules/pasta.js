var client = require("../methods");
var request = require("request");

var pasta = require("../config").copypasta;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.p (.+)/);
	var selection;
	if (match) selection = pasta[match[1].toLowerCase()];
	if (match && selection) {
		client.replyMessage(ev, selection);
	} else if (msg == ".p") {
		client.replyMessage(ev, Object.keys(pasta).reduce(function(p, c) {
			return p + ", " + c;
		}));
	}
});
