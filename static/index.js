document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "submit vote" event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
              // Create new item for list

              var msg = document.querySelector('#task').value;

              socket.emit('submit msg', msg);
            };
        });
    });

    // When a new vote is announced, add to the unordered list
    socket.on('msg totals', messages => {
        //Create list item
        const li = document.createElement('li');
        li.innerHTML = messages[messages.length - 1];

        // Add new item to task list
        document.querySelector('#tasks').append(li);

        // Clear input field and disable button again
        document.querySelector('#task').value = '';
        document.querySelector('#submit').disabled = true;

        // Stop form from submitting
        return false;

        //document.querySelector('#yes').innerHTML = data.yes;
        //document.querySelector('#no').innerHTML = data.no;
        //document.querySelector('#maybe').innerHTML = data.maybe;
    });
});

document.addEventListener('DOMContentLoaded', () => {


    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#task').onkeyup = () => {
        if (document.querySelector('#task').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    document.querySelector('#new-task').onsubmit = () => {

        // Create new item for list
        const li = document.createElement('li');
        li.innerHTML = document.querySelector('#task').value;

        // Add new item to task list
        document.querySelector('#tasks').append(li);

        // Clear input field and disable button again
        document.querySelector('#task').value = '';
        document.querySelector('#submit').disabled = true;

        // Stop form from submitting
        return false;
    };

});
*/
