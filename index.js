var Client = require('hangupsjs');
var Q = require('q');
var events = require("events");
var fs = require("fs");

var client = new Client();
exports.client = client;
exports.Client = Client;

var chat = new events.EventEmitter();
exports.chat = chat;
var n = 0;
fs.readdirSync(__dirname + "/chat_modules").forEach(function(file, index, arr) {
	if (file.slice(-2) == "js") require("./chat_modules/" + file);
	n++;
	if(index == arr.length-1) chat.setMaxListeners(n);
});

var creds = function() {
	return {
		auth: Client.authStdin
	};
};

//client.loglevel('debug');

var reconnect = function() {
	client.connect(creds).then(function() {});
};

client.on('chat_message', function(ev) {
	if (ev.chat_message.message_content.segment !== null &&
		ev.self_event_state.user_id.gaia_id != ev.sender_id.gaia_id) {
		chat.emit("message", ev, ev.chat_message.message_content.segment[0].text);
	}
});

client.on('connect_failed', function() {
	Q.Promise(function(rs) {
		setTimeout(rs, 3000);
	}).then(reconnect);
});

client.connect(creds).then(function() {
	return console.log("signed in successfully");
}).done();
