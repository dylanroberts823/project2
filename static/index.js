document.addEventListener('DOMContentLoaded', () => {
    //Future project: figure out how to get it to load immediately
    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#task').onkeyup = () => {
        if (document.querySelector('#task').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        // Each button should emit a "submit vote" event
        document.querySelector('#new-task').onsubmit = () => {
          // Create new item for list
          const msg = document.querySelector('#task').value;

          //Get time
          const time = Date();

          //Send to SocketIO as JSON
          socket.emit('submit msg', {"msg":msg, "time":time});

          // Clear input field and disable button again
          document.querySelector('#task').value = '';
          document.querySelector('#submit').disabled = true;

          // Stop form from submitting
          return false;
        };
    });

    // When a new vote is announced, add to the unordered list
    socket.on('msg totals', messages => {
        //clear list
        document.querySelector('#tasks').innerHTML = "";

        //Create list item
        messages.forEach((msg) => {
          //Create new object
          var para = document.createElement("P");
          para.innerText = msg["msg"] + "\n" + msg["time"];

          // Add new item to task list
          document.querySelector('#tasks').append(para);
        })
    });
});
