var imageSend = require("../lib/imageSend");

var client = require("../methods");

var config = require("../config");
var giphy = require("giphy-api")(config.giphy);

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.gif (.+)/);
	if (match) {
		client.startTyping(ev);
		giphy.search(match[1], function(err, res) {
			if (res.data.length > 0 && !err) {
				var rand = Math.floor(Math.random() * res.data.length);
				var gif = "https://media.giphy.com/media/" + res.data[rand].id + "/giphy.gif";
				imageSend(gif, ev);
			} else {
				client.replyMessage(ev, "No relevant gifs found.");
				client.stopTyping(ev);
			}
		});
	}
});
