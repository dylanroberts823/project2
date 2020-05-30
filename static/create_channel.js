document.addEventListener('DOMContentLoaded', () => {
  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {
    // Each button should emit a "submit vote" event
    document.querySelector('#create_channel').onclick = () => {
      //Get input from user
      var new_channel = prompt("Please select a name for your channel", "Channel Name");
      //Send message, user and time to SocketIO as JSON
      socket.emit('create channel', new_channel);
    }
  });

  //When a new channel has been created, load that page
  socket.on('redirect channel', new_channel => {
    localStorage.setItem('current_channel', new_channel);
    console.log("we're here");
    //Ideally, I'd refer to the flask page, but index will do
    window.location.href = "";
  });
});
