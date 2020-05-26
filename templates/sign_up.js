document.addEventListener('DOMContentLoaded', () => {

    //By default, set the display name to user
    var user_display = localStorage.getItem("username");
    document.querySelector('#user_display').innerHTML = user_display.value;

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#user').onkeyup = () => {
        if (document.querySelector('#user').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    document.querySelector('#set-user').onsubmit = () => {

        //Creaete and store local variable
        var input_username= document.getElementById("user");
        document.querySelector('#user_display').innerHTML = input_username.value;
        localStorage.setItem("username", input_username.value);

        // Clear input field and disable button again
        document.querySelector('#user').value = '';
        document.querySelector('#submit').disabled = true;

        // Stop form from submitting
        return false;
    };
});
