// basice setup  ======================================
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var Twit = require('twit');


// load settings ==================================
var settings = JSON.parse(fs.readFileSync('settings.json'));


// Http Server Configure =====================
app.use(express.static(__dirname + '/public'))
server.listen(settings.port);


// Twit client Start ============================
var T = new Twit(settings.twitter);



// Manage socket connections
var connections = [];
io.sockets.on('connection', function(socket) {
    connections.push(socket);
    socket.emit('news', { hello: 'hello!'});
});
