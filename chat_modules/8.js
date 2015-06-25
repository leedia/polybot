var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");

var decisions = {
	yes: [
		"It is certain",
		"Yes definitely",
		"It is decidedly so",
		"Most likely",
		"Signs point to yes"
	],
	no: [
		"Don't count on it",
		"My reply is no",
		"My sources say no",
		"Outlook not so good",
		"Very doubtful"
	]
};

String.prototype.hashCode = function() {
	var hash = 0,
		i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.8 (.+)/);
	if (match !== null) {
		var question = (Math.abs(match[1].hashCode()) % 2 === 0);
		var rand = Math.round(Math.random()*5);
		if(question) client.replyMessage(ev, decisions.yes[rand]);
		else client.replyMessage(ev, decisions.no[rand]);
	}
});
