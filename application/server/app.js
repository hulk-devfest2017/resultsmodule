const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/hulkdevfestgame');
var ResultSchema = mongoose.Schema({ player: {firstName:String,lastName:String},game:{score:Number, rank:Number}});
var Result = mongoose.model('Result',ResultSchema);



app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/build/index.html'));
});

app.use(express.static(path.join(__dirname, '../client/build')));


io.on('connection', function(socket){
  console.log('connection');

  var query = {};
  var options = {tailable: true, awaitdata: true, numberOfRetries: Number.MAX_VALUE};

  var stream = Result.find(query,null, options).stream();

  stream.on('data', function(result){
      console.log(result);
      socket.emit('results',`{"id":"${result._id}", "firstname":"${result.player.firstName}","lastname":"${result.player.firstName}","score":${result.game.score},"rank":${result.game.rank}}`);
  }).on('error', function (error){
      console.log(error);
  }).on('close', function () {
      console.log('closed');
  });

});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
