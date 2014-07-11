var FORWARDED_PORT = 8080;  // Port: 80 Forwarded to 8080

var express = require('express'),
http = require('http'),
io = require('socket.io');


var app = express(),
server = http.createServer(app); // Create HTTP Server

app.configure(function () {
  app.set('port', FORWARDED_PORT); // Set the app's port
});


// Initialize the HTTP server
server.listen(app.get('port'), function () {
  console.log("Express + Socket.io server listening on port " + app.get('port') + '...');
});

// Create and the Socket.io server and initialize it
var sio = io.listen(server);

sio.sockets.on('connection', function (client) {
  console.log("hello", client);
})
