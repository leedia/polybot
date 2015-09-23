var client = require("../methods");
var Markov = require("markov");
var markov = Markov(10);
var lim = 10000;

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.answer (.+)/);
	if (match) {
		client.startTyping(ev);
		client.getHistory(ev, lim, function(ret) {
			ret = ret.conversation_state.event.filter(function(evt) {
				return (evt.chat_message && evt.chat_message.message_content.segment.length > 0 && ev.self_event_state.user_id.chat_id != evt.sender_id.chat_id);
			}).map(function(evt) {
				return evt.chat_message.message_content.segment[0].text;
			}).reduce(function(prev, cur) {
				return prev + " " + cur;
			});
			client.replyMessage(ev, "answering...");
			markov.seed(ret, function() {
				var m = markov.respond(match[1]);
				client.replyMessage(ev, m[0]);
			});
		});
	}
});
