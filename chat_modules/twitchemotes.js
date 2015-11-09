var request = require('request');
var imageSend = require("../lib/imageSend");

var client = require("../methods");
var emotes = {};

var getEmotes = function() {
	request("https://api.twitch.tv/kraken/chat/kraken_test_user/emoticons", function(err, res, body) {
		if (!err) {
			body = JSON.parse(body);
			body.emoticons.forEach(function(emote) {
				emotes[emote.regex.toLowerCase()] = emote.url;
			});
		}
	});
};

client.chat.on("message", function(ev, msg) {
	if (Object.keys(emotes).indexOf(msg.toLowerCase()) > -1) {
		var emote = emotes[msg.toLowerCase()];
		imageSend(emote, ev);
	}
});

setInterval(getEmotes, 43200);

getEmotes();
