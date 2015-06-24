var client = require("../methods");
var request = require("request");

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.timer (.+)/);
	if (match !== null) {
		var expr = match[1];
    var time = match[1] * 1000;
		if (expr*1 == expr && expr < 18000) {
			client.replyMessage(ev, "Counting down from " + expr + "s.");
			setTimeout(function(){
        client.replyMessage(ev, "Timer reached 0s.");
      }, time);
		}
    else {
      client.replyMessage(ev, "Error: not a valid time duration.");
    }
	}
});
