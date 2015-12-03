var http=require('http');
var url=require('url');
var fs=require('fs');

var server = http.createServer(function(req,res){

var path = url.parse(req.url).pathname;
switch(path){
    case '/test':
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write('It works!\n');
        res.end();
    break;

    default:
    send404(res);
    }
});

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};
server.listen(8000);