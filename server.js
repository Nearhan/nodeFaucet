// basice setup  ======================================
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var Twit = require('twit');
var sentiment = require('sentiment');
//var topicHash = require('./lib/topicHash')();



// load settings ==================================
var settings = JSON.parse(fs.readFileSync('settings.json'));


// Http Server Configure =====================
app.use(express.static(__dirname + '/public'))
server.listen(settings.port);


// Twit client Start ============================
var T = new Twit(settings.twitter);



// Manage socket connections
io.sockets.on('connection', function(socket) {
    socket.emit('news', { hello: 'hello!'});

    //setup newTopic listner
    socket.on('newTopic', function(data) {
        console.log(data);
        var dataObj = { track: data.topic };
        var stream = T.stream('statuses/filter', dataObj);

        //stream setup
        stream.on('tweet', function(tweetObj) {
            sentiment(tweetObj.text, function (err, result) {
                socket.emit(data.topic, { tweet:tweetObj.text, sent: result });

            });
        });


    });
});




// helpers ====================================
