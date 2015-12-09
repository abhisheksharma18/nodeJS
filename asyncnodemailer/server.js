var http = require('http'),
    app = http.createServer(handler).listen(8000),
    //io = require('socket.io').listen(app, { path: '/localqueen_notifications/socket.io' }),

    test1 = require('./test1');

//io.set('transports', ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

console.log('server listening on localhost:8000');
// on server started we can load our client.html page
function handler(req, res) {


}
test1.onStart();
