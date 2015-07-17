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
		client.stopTyping(ev);
	});
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

var stickers = {
	"gaben": "http://gabenislife.com/closeupgaben.jpg",
	"kappa": "http://i.imgur.com/6CbxaPc.jpg",
	"catbus": "http://media3.giphy.com/media/qhuFHjIDMYrfO/giphy.gif",
	"totoro": "https://33.media.tumblr.com/b080d76a89a35cc237eaa0e818f5e871/tumblr_mtymcgKuha1sjro9ko1_500.gif",
	"doot": "http://media.giphy.com/media/p7PU6lbV4Rq3C/giphy.gif",
	"elf": "https://33.media.tumblr.com/tumblr_namirtXRfE1rjk6q4o1_1408583536_cover.jpg",
	"kreygasm": "https://static-cdn.jtvnw.net/emoticons/v1/41/1.0/index.jpg",
	"pogchamp": "https://static-cdn.jtvnw.net/emoticons/v1/88/1.0/index.jpg",
	"failfish": "https://static-cdn.jtvnw.net/emoticons/v1/360/1.0/index.jpg"
};

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.s (.+)/);
	if (match !== null && stickers[match[1]]) {
		client.startTyping(ev);
		var sticker = stickers[match[1]];
		var hash = sticker.slice(0, -4).hashCode() + sticker.slice(-4);
		download(sticker, "cache/" + hash, function() {
			var size = fs.statSync("cache/" + hash).size;
			if (size < 20 * 1000000) {
				client.replyImage(ev, "cache/" + hash, function() {
					deleteFile("cache/" + hash);
				});
			} else {
				deleteFile("cache/" + hash);
			}
		});
	}
});
