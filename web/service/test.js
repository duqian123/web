var http = require('http');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end("hello,word\n");
}).listen(8887,'127.0.0.1');
console.log('Server runing at http://127.0.0.1:8887');