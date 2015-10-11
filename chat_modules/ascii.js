var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");

var ascii = require("../config").ascii;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.a (.+)/);
	var art;
	if (match) art = ascii[match[1].toLowerCase()];
	if (match && art) {
		client.replyMessage(ev, art);
	} else if (msg == ".a") {
		client.replyMessage(ev, Object.keys(ascii).reduce(function(p, c) {
			return p + ", " + c;
		}));
	}
});
