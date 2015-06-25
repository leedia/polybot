var client = require("./index").client;
var Client = require("./index").Client;
exports.chat = require("./index").chat;

exports.replyMessage = function(trig, body) {
	client.sendchatmessage(trig.conversation_id.id, [
		[0, body]
	]).then(function() {});
};

exports.replySegments = function(trig, segments) {
	client.sendchatmessage(trig.conversation_id.id, segments).then(function() {
		
	});
};

exports.replyLink = function(trig, link) {
	var linkbuilder = new Client.MessageBuilder();
	var segments = linkbuilder.link(link, link).toSegments();
	client.sendchatmessage(trig.conversation_id.id, segments);
};

exports.replyImage = function(trig, path, fn) {
	client.uploadimage(path).then(function(id) {
		client.sendchatmessage(trig.conversation_id.id, [], id).then(function() {
			fn();
		});
	});
};

exports.leaveChat = function(ev) {
	client.removeuser(ev.conversation_id.id);
};

exports.startTyping = function(ev) {
	client.settyping(ev.conversation_id.id, Client.TypingStatus.TYPING);
};

exports.stopTyping = function(ev) {
	client.settyping(ev.conversation_id.id, Client.TypingStatus.STOPPED);
};

exports.client = client;
exports.Client = Client;
