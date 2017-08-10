const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../build/index.html'));
});

app.use(express.static(path.join(__dirname, '../build')));


io.on('connection', function(socket){
  console.log('connection');
  setTimeout(function () {
    socket.emit('results','{"firstname":"fromserver","lastname":"dfsdfd","score":100}');
    console.log('message emitted')
}, 3000)

});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
