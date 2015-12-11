var client = require("../methods");

client.chat.on("message", function(ev, msg){
	if(msg == ".stats") {
		var stats = client.getStats();
		var builder = new client.Client.MessageBuilder();
		var segments = builder.bold("Statistics for Poly Bot since ").bold(stats.created.getMonth()).bold("/").bold(stats.created.getDate()).bold("/").bold(stats.created.getFullYear()).lineBreak().bold("Messages Sent: ").text(stats.messages).lineBreak().bold("Images sent: ").text(stats.images).toSegments();
		client.replySegments(ev, segments.segments);
	}
});
