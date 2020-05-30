document.addEventListener('DOMContentLoaded', () => {

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#msg').onkeyup = () => {
        if (document.querySelector('#msg').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        // Each button should emit a "submit vote" event
        document.querySelector('#new-msg').onsubmit = () => {
          // Create new item for list
          const channel = localStorage.getItem('current_channel');

          const msg = document.querySelector('#msg').value;

          //Get user
          const user = localStorage.getItem('user');

          //Get time
          const time = Date();



          //Send message, user and time to SocketIO as JSON
          socket.emit('submit msg', {"channel": channel, "msg":msg, "user":user, "time":time});

          // Clear input field and disable button again
          document.querySelector('#msg').value = '';
          document.querySelector('#submit').disabled = true;

          // Stop form from submitting
          return false;
        };
    });

    // When a new vote is announced, add to the unordered list
    socket.on('msg totals', messages => {
        //clear list
        document.querySelector('#messages').innerHTML = "";

        //Get current channel
        const channel = localStorage.getItem('current_channel');
        
        //Create list item
        messages.forEach((msg) => {
          //Create new object
          if(msg["channel"] == channel){
            var para = document.createElement("P");
            para.innerText = msg["msg"] + "\n" + "Sent by " + msg["user"] + " at " + msg["time"];

            // Add new item to message list
            document.querySelector('#messages').append(para);
          };
        })
    });
});
