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
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/(https?:\/\/.*\.(?:png|jpe?g|gif(?!v)))/i);
	if (match ) {
		client.startTyping(ev);
		var hash = match[0].slice(0, -4).hashCode() + match[0].slice(-4);
		download(match[0], "cache/" + hash, function() {
			var size = fs.statSync("cache/" + hash).size;
			if (size < 20 * 1000000) {
				client.replyImage(ev, "cache/" + hash, function() {
					deleteFile("cache/" + hash);
				});
			} else {
				deleteFile("cache/" + hash);
			}
			client.stopTyping(ev);
		});
	}
});
