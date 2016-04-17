var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require("redis"),
  client = redis.createClient();

var messages = [
  {
    "message_id":0,
    "from":{"id":0,"first_name":"Pinwert"},
    "chat":{"id":0,"first_name":"Pinwert","type":"private"},
    "date":1460889212,
    "text":"Comenzamos"
  }];

  app.use(express.static('./'));

  io.on('connection', function(socket){
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
    // Any kind of message
  });

  client.subscribe('messages');
  client.on('message', function(channel,msg){
    console.log(msg);
    messages.push(JSON.parse(msg));
    io.sockets.emit('messages', messages);
  });

  server.listen(8080, function() {
    console.log("Servidor corriendo en http://localhost:8080");
  });
