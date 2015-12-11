var client = require("./index").client;
var Client = require("./index").Client;
exports.chat = require("./index").chat;

//statistics
var storage = require("node-persist");
storage.initSync();
var stats = storage.getItem("stats");
if (!stats) {
	stats = {created: new Date(), messages: 0, images: 0};
}
var addStat = function(typ){
	stats[typ]++;
	storage.setItem("stats", stats);
};

exports.getStats = function(){
	return storage.getItem("stats");
};

exports.replyMessage = function(trig, body, insig) { //insig being "insignificant" (not counting toward stats)
	client.sendchatmessage(trig.conversation_id.id, [
		[0, body]
	]).then(function() {
		if(!insig) addStat("messages");
	});
};

exports.replySegments = function(trig, segments) {
	client.sendchatmessage(trig.conversation_id.id, segments).then(function() {
		addStat("messages");
	});
};

exports.replyLink = function(trig, link) {
	var linkbuilder = new Client.MessageBuilder();
	var segments = linkbuilder.link(link, link).toSegments();
	client.sendchatmessage(trig.conversation_id.id, segments);
	addStat("messages");
};

exports.replyImage = function(trig, path, fn) {
	client.uploadimage(path).then(function(id) {
		client.sendchatmessage(trig.conversation_id.id, [], id).then(function() {
			fn();
			addStat("images");
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
