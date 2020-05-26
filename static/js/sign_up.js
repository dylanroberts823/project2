// Set starting value of counter to 0
if (!localStorage.getItem('user'))
    localStorage.setItem('user', "");

// Load current value of  counter
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#user_display').innerHTML = localStorage.getItem('user');

    // Count every time button is clicked
    document.querySelector('button').onclick = () => {
        // Identify input in field
        let user_temp = document.querySelector('#user').value;

        // Update counter
        document.querySelector('#user_display').innerHTML = user_temp;
        localStorage.setItem('user', user_temp);
    }
});
