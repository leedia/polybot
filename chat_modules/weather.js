var client = require("../methods");
var request = require("request");
var cheerio = require("cheerio");


client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.weather (.+)/);
	if (match !== null) {
		client.startTyping(ev);
		var zip = match[1];
		request("http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + zip, function(error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
				var temperature = $("[data-variable='temperature'] .wx-value").text();
				var condition = $("[data-variable='condition'] .wx-value").text();
        var location = $("#location h1").text();
				if(temperature !== "") client.replyMessage(ev, "Weather for " + location + ": " + temperature + "F, " + condition);
        else client.replyMessage(ev, "Location not found.");
				client.stopTyping(ev);
			} else {
				client.replyMessage(ev, "error");
			}
		});
	}
});
