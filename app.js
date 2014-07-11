
var REMOTE_PORT = 8080;
var HTTP_PORT = 6000;

var http = require('http'),
    net = require('net'),
    url = require('url'),
    io = require('socket.io'),
    server;

var remoteClients = [];

server = http.createServer( function(req,res){
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Welcome.</h1>');
      res.end();
      break;
  default: send404(res);
  }    
  console.log(path);
}),
send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(HTTP_PORT);


net.createServer(function(socket){
    
  console.log('Connected Remote Client: ' + socket.remoteAddress +':'+ socket.remotePort);
  remoteClients.push(socket); //add client
  
  
  console.log('tcp server running on port ', TCP_PORT);
  console.log('web server running on port ', HTTP_PORT);
  
  socket.on('close', function() {
        for(var i = 0; i < remoteClients.length; i++) {
            if(remoteClients[i] == socket) { //remove client
                remoteClients.splice(i,1);
                break;
            }
        }
    console.log('Disconnected remote client: ' + socket.remoteAddress +':'+ socket.remotePort);
    });
    // Add a 'data' event handler to this instance of socket
    socket.on('data', function(data) {
        console.log('data?');
        for ( var i = 0; i < data.length; i++){
            handleByte(data[i]);
        }
        function handleByte(buf){}
    });
}).listen(REMOTE_PORT);
console.log('Server listening for remote connections on ' + REMOTE_PORT);



