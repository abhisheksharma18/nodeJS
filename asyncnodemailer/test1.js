/**
 * Created by prasoon on 9/14/2015.
 */
var redis = require("redis"),
    client = redis.createClient('redis://127.0.0.1:6379');
    var test2 = require('./test2');
    var mailer = require('./mailer');
//var Notify = require('./Notify');

exports.onStart = function(){
    client.on("error", function (err) {
        console.log("Error %s", err);
    });

    client.on("message", function (channel, message) {
        console.log("Message : " + channel);
         console.log(message);
        var object = JSON.parse(message);
        //var tokenList = object.map.token.myArrayList[1];

            if(channel == "in.eduthon.mailer.message"){
               // Notify.notifyMessageUser(tokenList[i]);
               //fetch db
                mailer.massMailer();
               console.log(object);
            }

    });
    console.log("Subscribing to topics : ");
    client.subscribe("in.eduthon.mailer.message");
    test2.publish();

}