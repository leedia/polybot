var client = require("../methods");

client.chat.on("message", function(ev, msg){
	if(msg == ".stats") {
		var stats = client.getStats();
		stats.created = new Date(stats.created);
		var st = "";
		st += "Statistics for Poly Bot since " + (parseInt(stats.created.getMonth()) + 1) + "/" + stats.created.getDate() + "/" + stats.created.getFullYear();
		st += " Messages: " + stats.messages.toString();
		st += " Images: " + stats.images.toString();
		client.replyMessage(ev, st, true);
	}
});
