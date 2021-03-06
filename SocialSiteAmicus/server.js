//required modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');


//mimetype array
var mimeTypes = {
    "html" : "text/html",
    "jpeg" : "img/jpeg",
    "jpg"  : "img/jpeg",
    "png"  : "img/png",
    "js"   : "text/javascript",
    "css"  : "text/css"
}

//server creation
http.createServer(function(req,res){
    var uri = url.parse(req.url).pathname;

    var fileName = path.join(process.cwd(),unescape(uri));
    console.log('Loading '+uri);
    var stats;
   if(uri == "/contact/send"){
        console.log(uri + " hahahahaha ");
        console.log(((req.url.split('?')[1]).split('&')[1]).split('=')[0]);
        res.end();
        return;
   }
    try{
        stats=fs.lstatSync(fileName);
    }catch(e){
        res.writeHead(404,{'Content-type':'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200,{'Content-type':mimeType});
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);

    }
    else if(stats.isDirectory()){
        res.writeHead(302,{'Location' : 'index.html'});
        res.end();
    }
    else{
        res.writeHead(500,{'Content-type': 'text/plain'});
        res.write('500 internal error');
        res.end();
    }

}).listen(3000);

