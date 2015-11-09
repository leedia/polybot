var fs = require('fs');
var request = require('request');

var client = require("../methods");

var download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

var deleteFile = function(path) {
	fs.unlink(path, function(err) {
		if (err) throw err;
	});
};

String.prototype.hashCode = function() {
	var hash = 0,
		i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return hash;
};

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
		client.startTyping(ev);
		var hash = emote.slice(0, -4).hashCode() + emote.slice(-4);
		download(emote, "cache/" + hash, function() {
			var size = fs.statSync("cache/" + hash).size;
			if (size < 20 * 1000000) {
				client.replyImage(ev, "cache/" + hash, function() {
					deleteFile("cache/" + hash);
					client.stopTyping(ev);
				});
			} else {
				deleteFile("cache/" + hash);
			}
		});
	}
});

setInterval(getEmotes, 43200);

getEmotes();
