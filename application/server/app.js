const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hulkdevfestgame');
var ResultSchema = mongoose.Schema({ player: {firstName:String,lastName:String},game:{score:Number, rank:Number}});
var Result = mongoose.model('Result',ResultSchema);



app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../client/build/index.html'));
});

app.use(express.static(path.join(__dirname, '../client/build')));

io.on('connection', function(socket){
  console.log('connection');

  let _startStreaming = function() {
    let query = {};
    let options = {tailable: true, awaitdata: true, numberOfRetries: Number.MAX_VALUE};
    let cursor = Result.find(query,null, options).cursor();
  
    cursor.on('data', function(result){
        console.log(result);
        socket.emit('results',`{"id":"${result._id}", "firstname":"${result.player.firstName}","lastname":"${result.player.lastName}","score":${result.game.score},"rank":${result.game.rank}}`);
    }).on('error', function (error){
        console.log("error : ", error);
        _startStreaming();
    }).on('close', function () {
        console.log('closed');
    });
  }

  _startStreaming();
});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
