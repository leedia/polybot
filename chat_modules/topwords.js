var client = require("../methods");
var lim = 10000;

client.chat.on("message", function(ev, msg) {
	if (msg == ".topwords") {
		client.replyMessage(ev, "Reading chat up to " + lim + " messages...");
		client.startTyping(ev);
		client.getHistory(ev, lim, function(ret) {
			var words = {};
			ret.conversation_state.event.forEach(function(evt, ind) {
				if (evt.chat_message && evt.chat_message.message_content.segment.length > 0 &&
				ev.self_event_state.user_id.gaia_id != evt.sender_id.gaia_id) {
					var message = evt.chat_message.message_content.segment[0].text.split(" ");
					message.forEach(function(word) {
						if (words[word.toLowerCase()]) {
							words[word]++;
						} else if (word.charAt(0) != "." && word !== "") words[word.toLowerCase()] = 1;
					});
				}
			});
			var keys = Object.keys(words)
			.map(function(val) {
				return {
					word: val,
					count: words[val]
				};
			}).sort(function(a, b) {
				return b.count - a.count;
			});
			var top = 20;
			if (top > keys.length) top = keys.length;
			var builder = new client.Client.MessageBuilder();
			var segments = builder;
			segments.italic("Top words out of " + lim + " messages:").toSegments();
			for (var i = 0; i < top; i++) {
				segments.linebreak();
				segments.underline(keys[i].word);
				segments.text(": ");
				segments.bold(keys[i].count.toString());
			}
			segments.toSegments();
			client.replySegments(ev, segments.segments);
			client.stopTyping(ev);
		});
	}
});
