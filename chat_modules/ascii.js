var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");

var ascii = {
	shrug: "¯\\_(ツ)_/¯",
	lenny: "( ͡° ͜ʖ ͡°)",
	dongers: "ヽ༼ຈل͜ຈ༽ﾉ",
	dongerhood: "༼ ºل͟º༼ ºل͟º༼ ºل͟º༼ ºل͟º ༽ºل͟º ༽ºل͟º ༽YOU CAME TO THE WRONG DONGERHOOD༼ ºل͟º༼ ºل͟º༼ ºل͟º༼ ºل͟º ༽ºل͟º ༽ºل͟º ༽",
	gibe: "༼ つ ◕_◕ ༽つ",
	disapproval: "ಠ_ಠ",
	downeat: ":∩",
	tableflip: "(╯°□°)╯︵ ┻━┻"
};

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.ascii (.+)/);
	if (match ) {
		var art = match[1];
		if(ascii[art] !== undefined) client.replyMessage(ev, ascii[art]);
	}
});
