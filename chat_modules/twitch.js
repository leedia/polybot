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

var getThumbnailUrl = function(stream, fn) {
	request("https://api.twitch.tv/kraken/streams/" + stream, function(err, res, body) {
		if (!err) {
			body = JSON.parse(body);
			fn(body.stream.preview.medium);
		}
	});
};

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/twitch\.tv\/(\S+)\b/);
	if (match) {
		var stream = match[1];
		client.startTyping(ev);
		getThumbnailUrl(stream, function(thumbnailUrl) {
			var hash = thumbnailUrl.slice(0, -4).hashCode() + thumbnailUrl.slice(-4);
			download(thumbnailUrl, "cache/" + hash, function() {
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
		});
	}
});
