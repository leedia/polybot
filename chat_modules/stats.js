var client = require("../methods");

client.chat.on("message", function(ev, msg){
	if(msg == ".stats") {
		var stats = client.getStats();
		stats.created = new Date(stats.created);
		var builder = new client.Client.MessageBuilder();
		var segments = builder;
		segments.bold("Statistics for Poly Bot since " + (parseInt(stats.created.getMonth()) + 1) + "/" + stats.created.getDate() + "/" + stats.created.getFullYear());
		segments.linebreak();
		segments.text("Messages: ").bold(stats.messages.toString());
		segments.linebreak();
		segments.text("Images: ").bold(stats.images.toString());
		segments.toSegments();
		client.replySegments(ev, segments);
	}
});
