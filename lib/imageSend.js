var fs = require('fs');
var request = require('request');

var client = require("../methods");

module.exports = function(url, ev, fn) {
	/*client.startTyping(ev);
	var hash = url.slice(0, -4).hashCode() + url.slice(-4);
	download(url, "cache/" + hash, function() {
		var size = fs.statSync("cache/" + hash).size;
		if (size < 20 * 1000000) {
			client.replyImage(ev, "cache/" + hash, function() {
				deleteFile("cache/" + hash);
				client.stopTyping(ev);
				if(fn) fn();
			});
		} else {
			deleteFile("cache/" + hash);
			client.replyMessage(ev, "image is too large");
		}
	});*/
	if(fn) fn();
};

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
