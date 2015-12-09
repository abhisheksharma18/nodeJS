/**
 * Created by prasoon on 9/14/2015.
 */
var redis = require("redis"),
    client = redis.createClient('redis://127.0.0.1:6379');

//var Notify = require('./Notify');

exports.publish = function(){
    client.publish("in.eduthon.mailer.message",'{"username":"abhi"}');

}