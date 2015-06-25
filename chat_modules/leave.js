var client = require("../methods");

client.chat.on("message", function(ev, msg) {
	if (msg == ".leave") {
		client.replyMessage(ev, "Goodbye! Add me back anytime by entering nodepolybot@gmail.com");
		client.leaveChat(ev);
	}
});
