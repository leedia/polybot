var fs = require('fs');
var request = require('request');

var client = require("../methods");

var config = require("../config");
var giphy = require("giphy-api")(config.giphy);

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

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.gif (.+)/);
	if (match) {
		client.startTyping(ev);
		giphy.search(match[1], function(err, res) {
			if (res.data.length > 0 && !err) {
				var gif = "https://media.giphy.com/media/" + res.data[0].id + "/giphy.gif";
				var hash = gif.slice(0, -4).hashCode() + gif.slice(-4);
				download(gif, "cache/" + hash, function() {
					var size = fs.statSync("cache/" + hash).size;
					if (size < 20 * 1000000) {
						client.replyImage(ev, "cache/" + hash, function() {
							deleteFile("cache/" + hash);
							client.stopTyping(ev);
						});
					} else {
						deleteFile("cache/" + hash);
						client.stopTyping(ev);
					}
				});
			}
			else {
				client.replyMessage(ev, "No relevant gifs found.");
			}
		});
	}
});
