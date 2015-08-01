var client = require("../methods");
var fs = require("fs");

var emoticons = JSON.parse(fs.readFileSync("chat_modules/emoticons.json", "utf8"));
var emotes = ["firework", "horn", "confetti"];
var duration = 120;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.celebration/);
	if (match ) {
		var changeColor = function(i) {
			client.eggChat(ev, "bikeshed");
			setTimeout(function() {
				if (i < duration) changeColor(i + 1);
			}, 200);
		};
		var sendEmotes = function(i, e) {
			client.replyMessage(ev, emoticons[emotes[e]] + emoticons[emotes[e]] + emoticons[emotes[e]] + emoticons[emotes[e]]);
			setTimeout(function() {
				if(e == emotes.length - 1) e = -1;
				if (i < duration/2) sendEmotes(i + 1, e + 1);
			}, 500);
		};
		changeColor(0);
		sendEmotes(0, 0);
	}
});
