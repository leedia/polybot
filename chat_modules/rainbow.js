var client = require("../methods");
var duration = 50;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.rainbow/);
	if (match !== null) {
		var changeColor = function(i) {
			client.eggChat(ev, "bikeshed");
			setTimeout(function() {
				if (i < duration) changeColor(i + 1);
			}, 200);
		};
		changeColor(0);
	}
});
