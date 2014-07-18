

var HTTP_PORT = 8080;

var http = require('http'),
    net = require('net'),
    url = require('url'),
    fs = require('fs'),
    io = require('socket.io'),
    server;

var remoteClients = [];
var dataVal = 0;

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
                dataVal = obj.data;
        });
      } else {
        console.log(req.method);
      }
      break;
      case '/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    console.log(error);
                    res.writeHead(404);
                    res.write("opps this doesn't exist - 404");
                    res.end();
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data, "utf8");
                    res.end();
                }
            });
            break;

  default: 
        res.writeHead(404);
        res.write("ops this doesn't exist - 404")
        res.end();
        break;
  }    
});
  
  
server.listen(HTTP_PORT);
  

var io = io.listen(server);

io.sockets.on('connection', function(client){
        console.log('Connected!');
        var theTime = getDateTime();
        setInterval(function(){
            theTime = getDateTime();
            client.emit('date', {'date': theTime});
            client.emit('temp', {'temp': dataVal});
        }, 1000);
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


