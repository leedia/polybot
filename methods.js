var client = require("./index").client;
var Client = require("./index").Client;
exports.chat = require("./index").chat;

exports.replyMessage = function(trig, body) {
	client.sendchatmessage(trig.conversation_id.id, [
		[0, body]
	]).then(function() {});
};

exports.replySegments = function(trig, segments) {
	client.sendchatmessage(trig.conversation_id.id, segments).then(function() {});
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

exports.readChat = function(ev){
	client.setfocus(ev.conversation_id.id);
};

exports.leaveChat = function(ev) {
	client.removeuser(ev.conversation_id.id);
};

exports.getHistory = function(ev, length, fn) {
	client.getconversation(ev.conversation_id.id, new Date(), length).then(fn);
};

exports.getMemberByName = function(name, fn){
	client.searchentities(name, 5).then(function(entities){
		fn(entities.entity[0].id.chat_id);
	});
};

exports.renameChat = function(ev, name) {
	client.renameconversation(ev.conversation_id.id, name);
};

exports.eggChat = function(ev, egg) {
	client.sendeasteregg(ev.conversation_id.id, egg);
};

exports.startTyping = function(ev) {
	client.settyping(ev.conversation_id.id, Client.TypingStatus.TYPING);
};

exports.stopTyping = function(ev) {
	client.settyping(ev.conversation_id.id, Client.TypingStatus.STOPPED);
};

exports.client = client;
exports.Client = Client;
