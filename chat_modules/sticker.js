var imageSend = require("../lib/imageSend");

var client = require("../methods");

var stickers = require("../config").stickers;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.s (.+)/);
	var sticker;
	if(match) sticker = stickers[match[1].toLowerCase()];
	if (match && sticker) {
		imageSend(sticker, ev);
	}
	else if (msg == ".s") {
		client.replyMessage(ev, Object.keys(stickers).reduce(function(p, c){
			return p + ", " + c;
		}));
	}
});
