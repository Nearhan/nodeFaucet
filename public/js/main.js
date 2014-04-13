  var socket = io.connect('http://localhost:8080');
  socket.on('news', function (data) {
    console.log(data);
  });


var resultList = $("#resultList")
  // Submit event handler

  $('#daButton').click(function(e) {
      var tweetTopic = $(":text").val();
      console.log(tweetTopic);
      console.log(e);

      $(":text").val('');

      socket.on(tweetTopic, function (data) {
          console.log(data);
          appendToHtml(data);
      });

      socket.emit('newTopic', { topic: tweetTopic});
  });




function appendToHtml(data) {

    var row = '<tr> <td>'+ data.tweet + '</td> <td>' + data.sent.score + '</td> </tr>'
    resultList.append(row);

}
