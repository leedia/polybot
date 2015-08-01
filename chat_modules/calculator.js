var client = require("../methods");
var request = require("request");
var math = require("mathjs");

client.chat.on("message", function(ev, msg) {
	var match = msg.match(/\.c (.+)/);
  if(match ){
    var expr = match[1];
    try {
      var ans = math.eval(expr);
      client.replyMessage(ev, ans.toString());
    }
    catch(err){
      client.replyMessage(ev, err.toString());
    }
  }
});
