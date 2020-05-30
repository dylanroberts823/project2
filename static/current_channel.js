//If there is no username, get one via a prompt. Else, display it!
//Check if there is a username
if(!localStorage.getItem('current_channel')){
  //If there isn't prompt them for one
  var current_channel = "General"
  localStorage.setItem('current_channel', current_channel);
}
//Test to be sure name was properly stored
console.log(localStorage.getItem('current_channel'));

//Changes code somehow
document.addEventListener('DOMContentLoaded', () => {
  //Display name inside text body
  var channel = localStorage.getItem('current_channel')
  document.querySelector('#channel_display').innerHTML = channel;

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {
      //On selecting channel in drop down, change channel
      document.querySelectorAll('.dropdown-item').forEach(button => {
          button.onclick = () => {
              //Pull which button was pressed
              const selection = button.dataset.channel;

              //Set the local variable for the current channel
              localStorage.setItem('current_channel', selection);

              //Change the display to the current channel
              document.querySelector('#channel_display').innerHTML = selection;

              //Clear the message display
              document.querySelector('#messages').innerHTML = "";

              //Send change signal, getting latest messages
              socket.emit('load channel');
          };
      });
    });
});
