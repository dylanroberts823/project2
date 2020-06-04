function create_channel(channels) {
  document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
      // Each button should emit a "submit vote" event
      document.querySelector('#create_channel').onclick = () => {

        //Get input from user
        var new_channel = prompt("Please select a name for your channel", "Channel Name");

        //Make sure the input is appropriate by taking the input and looping it through conditions for every element in the array
        for (var i = 0; i < channels.length; i++) {
          //If the user inputs nothing, restart loop and prompt for another input
          console.log("iteration " + i);
          //If the channel name is already taken, restart the loop and prompt for new channel
          if (channels[i]["channel_id"] == new_channel){
            i = -1;
            new_channel = prompt("Sorry, that channel name is already taken. Please choose another", "Channel Name");
          }
          if (new_channel == "") {
            i = -1;
            new_channel = prompt("Sorry, we need you to select a name for your channel", "Channel Name");
          }
          //Stop the function if the user cancels
          if (new_channel == null) {
            return;
          }
        }

        //Since the channel is right, set that channel to that variable
        localStorage.setItem('current_channel', new_channel);

        //Send message, user and time to SocketIO as JSON
        socket.emit('create channel', new_channel);
      };
    });

    //When a new channel has been created, reload the page to show updates
    socket.on('redirect channel', () => {
      //Reload page to update channels drop-down
      window.location.href = "";
    });

  });
};
