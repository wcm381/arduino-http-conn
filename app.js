

var HTTP_PORT = 8080;

var http = require('http'),
    net = require('net'),
    url = require('url'),
    io = require('socket.io'),
    server;

var remoteClients = [];
var dataVal = 0;
var obj;

server = http.createServer( function(req,res){
   var path = url.parse(req.url).pathname;

   var timeVal = getDataTime();
   switch (path){
    case '/':
      if (req.method == 'POST') {
        console.log("POST");
        console.log(req.headers);
          
        var body = "";
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function () {
                console.log("Body: " + body);
                var obj = JSON.parse(body);
                console.log(obj.data);
        });
      } else {
        console.log(req.method);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html><head?<script scr="/socket.io/socket.io.js"></script>');
      res.write('<title>Hello</title></head><body>');
      res.write('<h1>'+dataVal+'</h1>')
      res.write('<p>'+timeVal+'</p>')
      res.write('<script>' + 'var socket = io.connect();' + '</script>');
      res.write('</body></html>');
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
  
  
});
server.listen(HTTP_PORT);
  


var io = io.listent(server);

io.on('connection', function(client) {
        console.log('Connected!');
        
        client.on('message', function(message){
            console.log('msg obj', message);
        });
});


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}


