var client = require("../methods");
var Markov = require("markov");
var markov = Markov(10);
var lim = 10000;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.markov (.+)/);
	if (match) {
		client.getMemberByName(match[1], function(id) {
			client.startTyping(ev);
			client.getHistory(ev, lim, function(ret) {
				ret = ret.conversation_state.event.filter(function(evt) {
					return (evt.chat_message && evt.chat_message.message_content.segment.length > 0 && evt.sender_id.chat_id == id);
				}).map(function(evt) {
					return evt.chat_message.message_content.segment[0].text;
				}).reduce(function(prev, cur) {
					return prev + " " + cur;
				});
				markov.seed(ret, function() {
					var k = markov.pick();
					client.replyMessage(ev, markov.fill(k, 1)[0]);
				});
			});
		});
	}
});
