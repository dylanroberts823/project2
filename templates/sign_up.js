document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#user_form').onsubmit = function() {
        const username = document.querySelector('#username').value;
        localStorage.setItem('username', username);
        alert(`Hello ${username}!`);
    }
});
