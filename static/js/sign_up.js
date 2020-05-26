// Set starting value of counter to 0
if (!localStorage.getItem('user'))
    localStorage.setItem('user', "");

// Load current value of  counter
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#user_display').innerHTML = localStorage.getItem('user');

    /* Could not manage to make it work
    // By default, submit button is disabled
    document.getElementById('#submit_btn').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#user').onkeyup = () => {
        if (document.querySelector('#user').value.length > 0) {
            document.getElementById('#submit_btn').disabled = false;
          }
        else {
            document.getElementById('#submit_btn').disabled = true;
          }
    };
    */


    // Count every time button is clicked
    document.querySelector('button').onclick = () => {
        // Identify input in field
        let user_temp = document.querySelector('#user').value;

        // Update user
        document.querySelector('#user_display').innerHTML = user_temp;
        localStorage.setItem('user', user_temp);

        // Clear input field and disable button again
        document.querySelector('#user').value = '';
    }
});
